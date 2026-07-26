// src/services/apiService.js

// API base URL — set VITE_API_URL in your .env file
// Local:      http://localhost:8080/api
// Production: https://your-backend.onrender.com/api
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Judge0 API Key — set VITE_JUDGE0_API_KEY in your .env file
// Get your key at: https://rapidapi.com/judge0-official/api/judge0-ce
const JUDGE0_API_KEY = import.meta.env.VITE_JUDGE0_API_KEY || '';

if (!JUDGE0_API_KEY) {
    console.warn('[RankQuest] VITE_JUDGE0_API_KEY is not set. Code execution will not work. See Frontend/.env.example.');
}

export { JUDGE0_API_KEY };

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

        // Handle non-JSON error responses (e.g. Spring Security 403 page)
        const contentType = response.headers.get('content-type');
        if (!response.ok) {
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }
            throw new Error(response.statusText || 'Request failed');
        }

        if (response.status === 204) return null;

        // Some endpoints return plain arrays (e.g. solved IDs), others return ApiResponse wrapper
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        return null;
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
};

// ───────────────────────────────────────────────
// Authentication
// ───────────────────────────────────────────────

export const signupUser = (userData) => {
    return request('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};

export const loginUser = (credentials) => {
    return request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
};

/**
 * Google OAuth sign-in.
 * Sends the Google ID token to the backend for verification.
 * Backend verifies with Google tokeninfo, then find-or-creates user.
 */
export const googleSignin = (idToken) => {
    return request('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ idToken }),
    });
};

/**
 * Get the current user's profile from their JWT token.
 * More secure than sending email as query param.
 */
export const getCurrentUser = () => {
    return request('/auth/me', { method: 'GET' });
};

// ───────────────────────────────────────────────
// User Profile
// ───────────────────────────────────────────────

const getEmail = () => {
    const savedUser = localStorage.getItem('rankquest_user');
    return savedUser ? JSON.parse(savedUser).email : '';
};

export const getUserProfile = () => {
    return request(`/users/profile-by-email?email=${encodeURIComponent(getEmail())}`, { method: 'GET' });
};

export const updateUserProfile = (data) => {
    return request(`/users/profile?email=${encodeURIComponent(getEmail())}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

// ───────────────────────────────────────────────
// Problems
// ───────────────────────────────────────────────

export const getAllProblems = () => {
    return request('/problems', { method: 'GET' });
};

export const getProblemById = (id) => {
    return request(`/problems/${id}`, { method: 'GET' });
};

// ───────────────────────────────────────────────
// Sheets
// ───────────────────────────────────────────────

export const getAllSheets = () => {
    return request('/sheets', { method: 'GET' });
};

export const getSheetBySlug = (slug) => {
    return request(`/sheets/${slug}`, { method: 'GET' });
};

export const getProblemsBySheet = (slug) => {
    return request(`/sheets/${slug}/problems`, { method: 'GET' });
};

// ───────────────────────────────────────────────
// Submissions
// ───────────────────────────────────────────────

/**
 * Submit a solution for a problem.
 * Uses JWT auth (Bearer token in header) — no email param needed.
 */
export const submitSolution = (problemId, submissionData) => {
    return request(`/submissions/${problemId}?email=${encodeURIComponent(getEmail())}`, {
        method: 'POST',
        body: JSON.stringify(submissionData),
    });
};

export const getSolvedProblems = () => {
    return request(`/submissions/my-solved?email=${encodeURIComponent(getEmail())}`, { method: 'GET' });
};

// ───────────────────────────────────────────────
// Rankings
// ───────────────────────────────────────────────

export const getGlobalRankings = () => {
    return request('/rankings/global', { method: 'GET' });
};

export const getCollegeRankings = (collegeName) => {
    const encodedCollege = encodeURIComponent(collegeName);
    return request(`/rankings/college?college=${encodedCollege}`, { method: 'GET' });
};

// ───────────────────────────────────────────────
// Activity & Heatmap
// ───────────────────────────────────────────────

export const getActivityHeatmap = () => {
    return request(`/activity/heatmap?email=${encodeURIComponent(getEmail())}`, { method: 'GET' });
};
