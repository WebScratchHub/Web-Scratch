
import { GeneratedImage, WebsiteProject } from "../types";

// =================================================================================
// VERY IMPORTANT SECURITY WARNING
// =================================================================================
// Storing client secrets and refresh tokens on the client-side is extremely
// insecure and should NEVER be done in a production application. This exposes
// sensitive credentials to anyone who inspects the web app's code.
//
// This implementation is for DEMONSTRATION PURPOSES ONLY to fulfill the user's
// specific request in a client-side-only environment.
//
// In a real-world application, this entire authentication and API interaction
// flow MUST be handled by a secure backend server (e.g., Node.js, Python)
// that keeps all credentials private.
// =================================================================================
const CLIENT_ID = '1023057886922-h71i4rhm3s95vfo5305s3bcbbjis845d.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REFRESH_TOKEN = '1//04dwUVm5IsCROCgYIARAAGAQSNwF-L9IrHuuEKcFhAbPlefV4j83UOcjvDnhAU4VHPUkJ8u_hIUA4syxaHRDwMY2Rr3POelcedzk';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const API_BASE_URL = 'https://www.googleapis.com/drive/v3';
const UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
const ROOT_FOLDER_NAME = 'WebScratchAI';

let accessToken: string | null = null;
let tokenExpiryTime: number = 0;

let rootFolderId: string | null = null;
const folderCache: Record<string, string> = {};

async function getAccessToken(): Promise<string> {
    if (accessToken && Date.now() < tokenExpiryTime) {
        return accessToken;
    }

    const response = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: REFRESH_TOKEN,
            grant_type: 'refresh_token',
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to refresh Google Drive access token.');
    }

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiryTime = Date.now() + (data.expires_in - 300) * 1000; // Refresh 5 mins before expiry
    return accessToken;
}

async function apiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = await getAccessToken();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || `Google Drive API error: ${response.statusText}`);
    }
    // Handle cases like 204 No Content
    return response.status === 204 ? null : response.json();
}

async function findOrCreateFolder(name: string, parentId: string = 'root'): Promise<string> {
    const cacheKey = `${parentId}-${name}`;
    if (folderCache[cacheKey]) {
        return folderCache[cacheKey];
    }

    const query = `name='${name}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents and trashed=false`;
    const response = await apiRequest(`/files?q=${encodeURIComponent(query)}&fields=files(id)`);
    
    if (response.files.length > 0) {
        const folderId = response.files[0].id;
        folderCache[cacheKey] = folderId;
        return folderId;
    }

    const fileMetadata = { name, mimeType: 'application/vnd.google-apps.folder', parents: [parentId] };
    const newFolder = await apiRequest('/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fileMetadata),
    });

    folderCache[cacheKey] = newFolder.id;
    return newFolder.id;
}

export async function init() {
    rootFolderId = await findOrCreateFolder(ROOT_FOLDER_NAME);
    console.log("🔗 Drive connected successfully");

    // Test file upload
    const testBlob = new Blob(['Connection successful!'], { type: 'text/plain' });
    const formData = new FormData();
    const metadata = { name: 'test.txt', parents: [rootFolderId] };
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', testBlob);
    
    const token = await getAccessToken();
    await fetch(UPLOAD_URL, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
    });
}

export async function initUserFolders(userId: string): Promise<Record<string, string>> {
    if (!rootFolderId) throw new Error("Drive service not initialized.");
    const userFolder = await findOrCreateFolder(userId, rootFolderId);
    const imagesFolder = await findOrCreateFolder('images', userFolder);
    const websitesFolder = await findOrCreateFolder('websites', userFolder);
    return { user: userFolder, images: imagesFolder, websites: websitesFolder };
}

async function findFileIdByName(folderId: string, fileName: string): Promise<string | null> {
    const query = `name='${fileName}' and '${folderId}' in parents and trashed=false`;
    const response = await apiRequest(`/files?q=${encodeURIComponent(query)}&fields=files(id)`);
    return response.files.length > 0 ? response.files[0].id : null;
}

export async function uploadFile(userId: string, folderType: 'images' | 'websites', fileName: string, content: Blob, appProperties: Record<string, string>, isUpdate: boolean = false) {
    if (!rootFolderId) throw new Error("Drive service not initialized.");
    const folders = await initUserFolders(userId);
    const parentFolderId = folders[folderType];

    const metadata = { name: fileName, parents: [parentFolderId], appProperties };
    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', content);

    const token = await getAccessToken();
    let fileId = isUpdate ? await findFileIdByName(parentFolderId, fileName) : null;
    
    const uploadMethod = fileId ? 'PATCH' : 'POST';
    const uploadUrl = fileId ? `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart` : UPLOAD_URL;

    const response = await fetch(uploadUrl, {
        method: uploadMethod,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
    });
    
    if (!response.ok) throw new Error("File upload failed");
    console.log("✅ File uploaded to Drive:", fileName);
    return response.json();
}

export async function listFiles(userId: string, folderType: 'images' | 'websites', fields: string): Promise<any[]> {
    if (!rootFolderId) throw new Error("Drive service not initialized.");
    const folders = await initUserFolders(userId);
    const parentFolderId = folders[folderType];
    const query = `'${parentFolderId}' in parents and trashed=false`;
    const response = await apiRequest(`/files?q=${encodeURIComponent(query)}&fields=files(${fields})`);
    return response.files || [];
}

export async function getFileContent(fileId: string): Promise<Blob> {
    const token = await getAccessToken();
    const response = await fetch(`${API_BASE_URL}/files/${fileId}?alt=media`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Failed to download file content");
    return response.blob();
}

export async function deleteFileByName(userId: string, folderType: 'images' | 'websites', fileName: string): Promise<void> {
    if (!rootFolderId) throw new Error("Drive service not initialized.");
    const folders = await initUserFolders(userId);
    const parentFolderId = folders[folderType];
    const fileId = await findFileIdByName(parentFolderId, fileName);
    if (fileId) {
        await apiRequest(`/files/${fileId}`, { method: 'DELETE' });
    }
}

export async function fetchWebsiteProjects(userId: string): Promise<WebsiteProject[]> {
    const files = await listFiles(userId, 'websites', 'id, name, appProperties');
    return Promise.all(files.map(async file => {
        const contentBlob = await getFileContent(file.id);
        const html = await contentBlob.text();
        return {
            id: file.appProperties.id,
            userId: file.appProperties.userId,
            name: file.appProperties.name,
            createdAt: file.appProperties.createdAt,
            html: html
        };
    }));
}

export async function fetchGeneratedImages(userId: string): Promise<GeneratedImage[]> {
    const files = await listFiles(userId, 'images', 'id, name, appProperties');
    return Promise.all(files.map(async file => {
        const contentBlob = await getFileContent(file.id);
        const imageUrl = URL.createObjectURL(contentBlob);
        return {
            id: file.appProperties.id,
            userId: file.appProperties.userId,
            prompt: file.appProperties.prompt,
            negativePrompt: file.appProperties.negativePrompt,
            style: file.appProperties.style,
            aspectRatio: file.appProperties.aspectRatio as any,
            createdAt: file.appProperties.createdAt,
            isFavorite: file.appProperties.isFavorite === 'true',
            imageUrl: imageUrl
        };
    }));
}
