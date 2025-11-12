import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import * as Icons from '../ui/Icons';
// FIX: Imported 'AnimatePresence' to be used in the component.
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../ui/Input';
import DownloadProjectModal from '../ui/DownloadProjectModal';
import { useGitHubAuth } from '../../hooks/useGitHubAuth';

interface ProfilePageProps {
}

const ProfileCard: React.FC<{ title: string; description: string; children: React.ReactNode; }> = ({ title, description, children }) => {
    return (
        <div className="bg-white/5 border border-white/[.08] rounded-2xl p-6 shadow-glow-violet-md">
            <h2 className="text-xl font-bold text-text-main">{title}</h2>
            <p className="text-text-secondary mt-1 mb-6">{description}</p>
            <div className="space-y-4">{children}</div>
        </div>
    );
};

const ProfilePage: React.FC<ProfilePageProps> = () => {
    const { user, updateUserProfile, changeUserPassword } = useAuth();
    const githubAuth = useGitHubAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Profile Info State
    const [fullName, setFullName] = useState(user?.fullName || '');
    const [profilePic, setProfilePic] = useState<string | null>(user?.profilePictureUrl || null);
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Password State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    
    // Download Modal State
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    

    useEffect(() => {
      setFullName(user?.fullName || '');
      setProfilePic(user?.profilePictureUrl || null);
    }, [user]);

    const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setProfilePic(loadEvent.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileLoading(true);
        setProfileMessage(null);
        try {
            await updateUserProfile({ fullName, profilePictureUrl: profilePic || undefined });
            setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setProfileMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }
        setPasswordLoading(true);
        setPasswordMessage(null);
        try {
            await changeUserPassword(currentPassword, newPassword);
            setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            setPasswordMessage({ type: 'error', text: error.message || 'Failed to change password.' });
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <>
        <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4.5rem)]">
            <header className="mb-12">
                <h1 className="text-4xl font-bold text-text-main text-glow">Edit Profile</h1>
                <p className="text-text-secondary mt-2">Manage your account settings and personal information.</p>
            </header>

            <motion.div 
                className="max-w-2xl mx-auto space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <form onSubmit={handleProfileSave}>
                    <ProfileCard title="Profile Information" description="Update your photo and personal details.">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <img src={profilePic || `https://ui-avatars.com/api/?name=${fullName}&background=7B61FF&color=fff`} alt="Profile" className="w-20 h-20 rounded-full object-cover bg-white/10" />
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 bg-secondary rounded-full p-1.5 text-dark-bg hover:scale-110 transition-transform">
                                    <Icons.PencilSquareIcon className="w-4 h-4" />
                                </button>
                                <input type="file" ref={fileInputRef} onChange={handlePictureUpload} accept="image/*" className="hidden" />
                            </div>
                            <div className="flex-1">
                                <Input label="Full Name" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required />
                                <Input label="Email" id="email" value={user?.email || ''} disabled className="mt-2 bg-white/5 cursor-not-allowed" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" isLoading={profileLoading}>Save Changes</Button>
                        </div>
                        {profileMessage && <p className={`text-sm text-center ${profileMessage.type === 'success' ? 'text-success' : 'text-error'}`}>{profileMessage.text}</p>}
                    </ProfileCard>
                </form>

                <form onSubmit={handlePasswordChange}>
                    <ProfileCard title="Change Password" description="For your security, you will need to enter your current password.">
                        <Input label="Current Password" id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                        <Input label="New Password" id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                        <Input label="Confirm New Password" id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                        <div className="flex justify-end">
                            <Button type="submit" isLoading={passwordLoading}>Update Password</Button>
                        </div>
                        {passwordMessage && <p className={`text-sm text-center ${passwordMessage.type === 'success' ? 'text-success' : 'text-error'}`}>{passwordMessage.text}</p>}
                    </ProfileCard>
                </form>

                <ProfileCard title="Integrations" description="Connect your account to third-party services.">
                    {githubAuth.user ? (
                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <img src={githubAuth.user.avatar_url} alt="GitHub avatar" className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold text-text-main">Connected to GitHub</p>
                                    <p className="text-sm text-text-secondary">{githubAuth.user.login}</p>
                                </div>
                            </div>
                            <Button variant="secondary" size="sm" onClick={githubAuth.logout}>Disconnect</Button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <Icons.GitHubIcon className="w-10 h-10 text-text-secondary" />
                                <div>
                                    <p className="font-semibold text-text-main">GitHub</p>
                                    <p className="text-sm text-text-secondary">Publish websites directly to GitHub Pages.</p>
                                </div>
                            </div>
                            <Button onClick={githubAuth.login} isLoading={githubAuth.isLoading}>
                                <Icons.GitHubIcon className="w-5 h-5 mr-2" />
                                {githubAuth.isLoading ? 'Connecting...' : 'Connect'}
                            </Button>
                        </div>
                    )}
                </ProfileCard>

                <ProfileCard title="Export Project" description="Download all project files to run and deploy locally.">
                    <div className="flex justify-between items-center">
                        <p className="text-text-secondary text-sm">Get a copy of your entire Web Scratch project.</p>
                        <Button onClick={() => setIsDownloadModalOpen(true)}>
                            <Icons.DownloadIcon className="w-5 h-5 mr-2" />
                            Download Files
                        </Button>
                    </div>
                </ProfileCard>
            </motion.div>
        </div>
        <AnimatePresence>
            {isDownloadModalOpen && <DownloadProjectModal onClose={() => setIsDownloadModalOpen(false)} />}
        </AnimatePresence>
        </>
    );
};

export default ProfilePage;
