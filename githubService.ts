import { GitHubUser } from '../hooks/useGitHubAuth';

// =================================================================================
// VERY IMPORTANT SECURITY WARNING
// =================================================================================
// This client-side OAuth flow is for DEMONSTRATION PURPOSES ONLY in a sandboxed
// environment. Exchanging a code for a token requires a CLIENT_SECRET, which
// MUST NEVER be exposed in a client-side application.
//
// In a real-world, production application, this entire `exchangeCodeForToken`
// function MUST be replaced by a call to your own secure backend server. Your
// server would securely store the client secret and perform the token exchange.
// The CORS proxy used here is a temporary, insecure workaround for this demo.
// =================================================================================
const TOKEN_PROXY_URL = 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token';
const GITHUB_CLIENT_ID = 'Ov23li3JjG4g6v7J5A8B';
const GITHUB_CLIENT_SECRET = 'DO_NOT_STORE_THIS_IN_FRONTEND'; // DANGER: Placeholder only.

export const exchangeCodeForToken = async (code: string): Promise<string> => {
  // AGAIN, THIS IS INSECURE. In production, this would be:
  // const response = await fetch('https://your-backend.com/api/github/callback', { ... });
  const response = await fetch(TOKEN_PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();
  if (data.error || !data.access_token) {
    throw new Error(data.error_description || 'Failed to get access token from GitHub.');
  }
  return data.access_token;
};


const GITHUB_API_BASE = 'https://api.github.com';

const githubApiRequest = async (url: string, token: string, options: RequestInit = {}) => {
    const response = await fetch(`${GITHUB_API_BASE}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `GitHub API request failed: ${response.statusText}`);
    }
    if (response.status === 204) return null;
    return response.json();
};

export const getUser = (token: string): Promise<GitHubUser> => {
    return githubApiRequest('/user', token);
};

export const createRepo = (token: string, name: string): Promise<any> => {
    return githubApiRequest('/user/repos', token, {
        method: 'POST',
        body: JSON.stringify({
            name,
            private: false,
            auto_init: true, // Creates repo with a README, allowing immediate file upload
        }),
    });
};

export const uploadFile = (token: string, owner: string, repo: string, path: string, content: string, message: string): Promise<any> => {
    const encodedContent = btoa(unescape(encodeURIComponent(content))); // Base64 encode UTF-8 string
    return githubApiRequest(`/repos/${owner}/${repo}/contents/${path}`, token, {
        method: 'PUT',
        body: JSON.stringify({
            message,
            content: encodedContent,
            branch: 'main',
        }),
    });
};

export const enableGitHubPages = async (token: string, owner: string, repo: string): Promise<any> => {
     // First, try to enable pages
    try {
        return await githubApiRequest(`/repos/${owner}/${repo}/pages`, token, {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github.switcheroo-preview+json, application/vnd.github.v3+json',
            },
            body: JSON.stringify({
                source: {
                    branch: 'main',
                    path: '/',
                },
            }),
        });
    } catch (error: any) {
        // If it fails because pages are already enabled, that's okay.
        // We just fetch the existing pages info.
        if (error.message && error.message.includes("already has a GitHub Pages site")) {
             console.log("GitHub Pages site already exists, fetching info.");
             return await githubApiRequest(`/repos/${owner}/${repo}/pages`, token);
        }
        // If it's a different error, re-throw it.
        throw error;
    }
};