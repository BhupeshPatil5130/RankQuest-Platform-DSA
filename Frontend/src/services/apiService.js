// src/services/apiService.js

// API base URL — set VITE_API_URL in your .env file
// Local:      http://localhost:8080/api
// Production: https://rankquest-platform-dsa.onrender.com/api
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://rankquest-platform-dsa.onrender.com/api';

// Judge0 API Key — set VITE_JUDGE0_API_KEY in your .env file
const JUDGE0_API_KEY = import.meta.env.VITE_JUDGE0_API_KEY || '';

export { JUDGE0_API_KEY };

// High-speed in-memory cache map for sub-1ms instant responses
const cacheMap = new Map();
const DEFAULT_TTL_MS = 120 * 1000; // 2 minute cache for GET endpoints

export const clearApiCache = () => cacheMap.clear();

/**
 * Core request helper with JWT token injection and error handling.
 */
const request = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('rankquest_token');

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const config = { ...options, headers };

    try {
        const response = await fetch(url, config);

        if (response.status === 401 || response.status === 403) {
            return null;
        }

        const contentType = response.headers.get('content-type');
        if (!response.ok) {
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }
            throw new Error(response.statusText || 'Request failed');
        }

        if (response.status === 204) return null;

        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        return null;
    } catch (error) {
        console.error('API request error:', error);
        return null;
    }
};

/**
 * High-speed cached request wrapper for GET endpoints.
 */
const cachedRequest = async (endpoint, options = {}, ttlMs = DEFAULT_TTL_MS) => {
    const isGet = !options.method || options.method.toUpperCase() === 'GET';
    const token = localStorage.getItem('rankquest_token') || 'guest';
    const cacheKey = `${endpoint}_${token}`;

    if (isGet && cacheMap.has(cacheKey)) {
        const cached = cacheMap.get(cacheKey);
        if (Date.now() - cached.timestamp < ttlMs) {
            return cached.data;
        }
    }

    const data = await request(endpoint, options);
    if (isGet && data !== null) {
        cacheMap.set(cacheKey, { data, timestamp: Date.now() });
    }
    return data;
};

// ───────────────────────────────────────────────
// Authentication
// ───────────────────────────────────────────────

export const signupUser = async (userData) => {
    clearApiCache();
    return request('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};

export const loginUser = async (credentials) => {
    clearApiCache();
    return request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
};

export const googleSignin = async (idToken) => {
    clearApiCache();
    return request('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ idToken }),
    });
};

export const getCurrentUser = () => {
    return cachedRequest('/auth/me', { method: 'GET' });
};

// ───────────────────────────────────────────────
// User Profile
// ───────────────────────────────────────────────

const getEmail = () => {
    const savedUser = localStorage.getItem('rankquest_user');
    return savedUser ? JSON.parse(savedUser).email : '';
};

export const getUserProfile = () => {
    const email = getEmail();
    if (!email) return Promise.resolve(null);
    return cachedRequest(`/users/profile-by-email?email=${encodeURIComponent(email)}`, { method: 'GET' });
};

export const updateUserProfile = async (data) => {
    clearApiCache();
    return request(`/users/profile?email=${encodeURIComponent(getEmail())}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

// ───────────────────────────────────────────────
// Problems
// ───────────────────────────────────────────────

export const getAllProblems = () => {
    return cachedRequest('/problems', { method: 'GET' });
};

export const getProblemById = (id) => {
    return cachedRequest(`/problems/${id}`, { method: 'GET' });
};

// ───────────────────────────────────────────────
// Sheets
// ───────────────────────────────────────────────

export const getAllSheets = () => {
    return cachedRequest('/sheets', { method: 'GET' });
};

export const getSheets = getAllSheets;

export const getSheetBySlug = (slug) => {
    return cachedRequest(`/sheets/${slug}`, { method: 'GET' });
};

export const getProblemsBySheet = (slug) => {
    return cachedRequest(`/sheets/${slug}/problems`, { method: 'GET' });
};

// ───────────────────────────────────────────────
// Patterns
// ───────────────────────────────────────────────

export const getAllPatterns = () => {
    return cachedRequest('/patterns', { method: 'GET' });
};

export const getPatternBySlug = (slug) => {
    return cachedRequest(`/patterns/${slug}`, { method: 'GET' });
};

export const getProblemsByPattern = (slug) => {
    return cachedRequest(`/patterns/${slug}/problems`, { method: 'GET' });
};

// ───────────────────────────────────────────────
// Submissions
// ───────────────────────────────────────────────

export const submitSolution = async (problemId, submissionData) => {
    clearApiCache();
    return request(`/submissions/${problemId}?email=${encodeURIComponent(getEmail())}`, {
        method: 'POST',
        body: JSON.stringify(submissionData),
    });
};

export const getSolvedProblems = async () => {
    const email = getEmail();
    if (!email) return [];
    try {
        const res = await cachedRequest(`/submissions/my-solved?email=${encodeURIComponent(email)}`, { method: 'GET' });
        return Array.isArray(res) ? res : [];
    } catch (e) {
        return [];
    }
};

export const toggleSolveStatus = async (problemId, isSolved) => {
    clearApiCache();
    return request(`/submissions/${problemId}?email=${encodeURIComponent(getEmail())}`, {
        method: 'POST',
        body: JSON.stringify({ status: isSolved ? 'ACCEPTED' : 'UNSOLVED' }),
    });
};

// ───────────────────────────────────────────────
// Rankings
// ───────────────────────────────────────────────

export const getGlobalRankings = () => {
    return cachedRequest('/rankings/global', { method: 'GET' });
};

export const getCollegeRankings = (collegeName) => {
    const encodedCollege = encodeURIComponent(collegeName);
    return cachedRequest(`/rankings/college?college=${encodedCollege}`, { method: 'GET' });
};

// ───────────────────────────────────────────────
// Activity & Heatmap
// ───────────────────────────────────────────────

export const getActivityHeatmap = async () => {
    const email = getEmail();
    if (!email) return [];
    try {
        const res = await cachedRequest(`/activity/heatmap?email=${encodeURIComponent(email)}`, { method: 'GET' });
        return Array.isArray(res) ? res : [];
    } catch (e) {
        return [];
    }
};
