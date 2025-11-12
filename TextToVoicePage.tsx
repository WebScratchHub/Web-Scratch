import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { generateSpeech } from '../../services/geminiService';
import * as Icons from '../ui/Icons';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Spinner from '../ui/Spinner';

interface TextToVoicePageProps {
}

// Audio decoding helpers from Gemini guidelines
function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
}

// Helper to write string to DataView
const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
};

// Helper to convert AudioBuffer to a WAV Blob
const audioBufferToWavBlob = (buffer: AudioBuffer): Blob => {
    const numOfChan = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const length = buffer.length;
    const interleaved = new Int16Array(length * numOfChan);
    const channels = [];

    for (let i = 0; i < numOfChan; i++) {
        channels.push(buffer.getChannelData(i));
    }

    let offset = 0;
    for (let i = 0; i < length; i++) {
        for (let chan = 0; chan < numOfChan; chan++) {
            let sample = Math.max(-1, Math.min(1, channels[chan][i]));
            interleaved[offset++] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        }
    }

    const wavBuffer = new ArrayBuffer(44 + interleaved.length * 2);
    const view = new DataView(wavBuffer);

    // RIFF chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + interleaved.length * 2, true);
    writeString(view, 8, 'WAVE');
    // fmt sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // subchunk 1 size
    view.setUint16(20, 1, true); // audio format 1
    view.setUint16(22, numOfChan, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numOfChan * 2, true); // byte rate
    view.setUint16(32, numOfChan * 2, true); // block align
    view.setUint16(34, 16, true); // bits per sample
    // data sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, interleaved.length * 2, true);

    // Write PCM samples
    let pcmOffset = 44;
    for (let i = 0; i < interleaved.length; i++, pcmOffset += 2) {
        view.setInt16(pcmOffset, interleaved[i], true);
    }
    
    return new Blob([view], { type: 'audio/wav' });
};


const VOICES = ['Kore', 'Puck', 'Charon', 'Zephyr', 'Fenrir'];
const EXAMPLE_TEXT = "Hello, world! Welcome to the future of voice generation. With Web Scratch, you can create realistic voiceovers for any project.";

const TextToVoicePage: React.FC<TextToVoicePageProps> = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState(VOICES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedAudio, setGeneratedAudio] = useState<AudioBuffer | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const handleGenerate = async () => {
    if (!text) {
      setError("Please enter some text to generate speech.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedAudio(null);
    if (audioSourceRef.current) {
        audioSourceRef.current.stop();
    }
    
    try {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        
        const base64Audio = await generateSpeech(text, voice);
        const audioBytes = decode(base64Audio);
        const audioBuffer = await decodeAudioData(audioBytes, audioContextRef.current, 24000, 1);
        
        setGeneratedAudio(audioBuffer);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred during speech generation.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = () => {
    if (!generatedAudio || !audioContextRef.current) return;
    
    // Stop any currently playing audio
    if (audioSourceRef.current) {
        audioSourceRef.current.stop();
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = generatedAudio;
    source.connect(audioContextRef.current.destination);
    source.start();
    audioSourceRef.current = source;
  };

  const handleDownload = () => {
    if (!generatedAudio) return;

    const wavBlob = audioBufferToWavBlob(generatedAudio);
    const url = URL.createObjectURL(wavBlob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `web-scratch-voiceover.wav`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleUseExample = () => {
      setText(EXAMPLE_TEXT);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4.5rem)] flex items-center justify-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl"
        >
            <div className="bg-white/5 border border-white/[.08] rounded-2xl p-8 shadow-glow-violet-md">
                <div className="text-center mb-8">
                    <Icons.SpeakerWaveIcon className="w-16 h-16 mx-auto mb-4 text-secondary" />
                    <h1 className="text-3xl font-bold text-text-main text-glow">Text to Voiceover</h1>
                    <p className="text-text-secondary mt-2">Bring your text to life with natural-sounding AI voices.</p>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="text-input" className="block text-sm font-medium text-text-secondary">Your Text</label>
                            <Button variant="ghost" size="sm" onClick={handleUseExample} className="text-xs">Use Example</Button>
                        </div>
                        <textarea
                            id="text-input"
                            rows={6}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type or paste your text here..."
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-white/[.08] focus:border-secondary focus:ring-secondary bg-white/5 text-white placeholder:text-muted"
                        />
                    </div>
                    
                    <Select label="Choose a Voice" id="voice-select" value={voice} onChange={(e) => setVoice(e.target.value)}>
                        {VOICES.map(v => <option key={v} value={v}>{v}</option>)}
                    </Select>

                    <Button onClick={handleGenerate} isLoading={isLoading} className="w-full text-lg py-3">
                        {isLoading ? 'Generating Audio...' : 'Generate Voiceover'}
                    </Button>
                    
                    {error && <p className="text-error text-sm text-center bg-error/10 p-2 rounded-md">{error}</p>}

                    {generatedAudio && !isLoading && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-white/10 rounded-lg p-4 flex items-center justify-center flex-wrap gap-4"
                        >
                            <p className="font-semibold text-text-main">Generation complete!</p>
                            <div className="flex items-center gap-2">
                                <Button variant="secondary" onClick={playAudio}>
                                    <Icons.SpeakerWaveIcon className="w-5 h-5 mr-2" />
                                    Play Audio
                                </Button>
                                <Button variant="secondary" onClick={handleDownload}>
                                    <Icons.DownloadIcon className="w-5 h-5 mr-2" />
                                    Download
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default TextToVoicePage;
