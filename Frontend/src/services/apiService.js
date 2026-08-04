// src/services/apiService.js
// Enhanced with 3-layer caching: memory (instant) → sessionStorage (tab-persist) → network

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://rankquest-platform-dsa.onrender.com/api';
const JUDGE0_API_KEY = import.meta.env.VITE_JUDGE0_API_KEY || '';
export { JUDGE0_API_KEY };

// ─── Cache Configuration ──────────────────────────────────────────────────────
// TTL per endpoint type (ms)
const CACHE_TTL = {
  static:   10 * 60 * 1000,  // 10 min — patterns, sheets (rarely change)
  dynamic:   2 * 60 * 1000,  // 2 min  — user profile, solved lists
  live:      30 * 1000,       // 30 sec — rankings (changes frequently)
  session:  60 * 60 * 1000,  // 1 hr   — sessionStorage TTL
};

// ─── Layer 1: In-Memory Map (sub-millisecond, clears on tab close) ─────────────
const memCache = new Map();

// ─── Layer 2: sessionStorage (persists across renders, clears on tab close) ───
const SESSION_PREFIX = 'rq_cache_';

function sessionRead(key) {
  try {
    const raw = sessionStorage.getItem(SESSION_PREFIX + key);
    if (!raw) return null;
    const { data, expires } = JSON.parse(raw);
    if (Date.now() > expires) { sessionStorage.removeItem(SESSION_PREFIX + key); return null; }
    return data;
  } catch { return null; }
}

function sessionWrite(key, data, ttlMs) {
  try {
    sessionStorage.setItem(SESSION_PREFIX + key, JSON.stringify({ data, expires: Date.now() + ttlMs }));
  } catch { /* quota exceeded — ignore */ }
}

// ─── Request Deduplication ────────────────────────────────────────────────────
// Prevent parallel fetches for the same key
const inflight = new Map();

export const clearApiCache = () => {
  memCache.clear();
  try {
    Object.keys(sessionStorage)
      .filter(k => k.startsWith(SESSION_PREFIX))
      .forEach(k => sessionStorage.removeItem(k));
  } catch { /* ignore */ }
};

// ─── Core Fetch ───────────────────────────────────────────────────────────────
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('rankquest_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 || response.status === 403) {
      // Auto-logout for expired tokens is handled by AuthContext
      const err = new Error(`${response.status}`);
      throw err;
    }

    if (response.status === 204) return null;

    const contentType = response.headers.get('content-type');
    if (!response.ok) {
      const errorData = contentType?.includes('application/json')
        ? await response.json()
        : { message: response.statusText };
      throw new Error(errorData.message || 'Request failed');
    }

    if (contentType?.includes('application/json')) return response.json();
    return null;
  } catch (error) {
    console.warn(`[API] ${options.method || 'GET'} ${endpoint}:`, error.message);
    throw error; // re-throw so callers can decide to use fallback
  }
};

// ─── Multi-Layer Cached GET ───────────────────────────────────────────────────
/**
 * Fetches data with 3-layer cache: memory → sessionStorage → network.
 * @param {string} endpoint
 * @param {number} memTtl   - in-memory TTL ms
 * @param {number} sessTtl  - sessionStorage TTL ms
 */
const cachedGet = async (endpoint, memTtl = CACHE_TTL.dynamic, sessTtl = CACHE_TTL.session) => {
  const token  = localStorage.getItem('rankquest_token') || 'guest';
  const cacheKey = `${endpoint}_${token}`;

  // Layer 1: Memory hit (sub-ms)
  if (memCache.has(cacheKey)) {
    const { data, expires } = memCache.get(cacheKey);
    if (Date.now() < expires) return data;
    memCache.delete(cacheKey);
  }

  // Layer 2: sessionStorage hit (avoids network on same tab re-renders)
  const sessData = sessionRead(cacheKey);
  if (sessData !== null) {
    memCache.set(cacheKey, { data: sessData, expires: Date.now() + memTtl });
    return sessData;
  }

  // Layer 3: Deduplication — if same request already in-flight, wait for it
  if (inflight.has(cacheKey)) return inflight.get(cacheKey);

  const promise = request(endpoint, { method: 'GET' })
    .then(data => {
      if (data !== null && data !== undefined) {
        memCache.set(cacheKey, { data, expires: Date.now() + memTtl });
        sessionWrite(cacheKey, data, sessTtl);
      }
      inflight.delete(cacheKey);
      return data;
    })
    .catch(err => {
      inflight.delete(cacheKey);
      throw err;
    });

  inflight.set(cacheKey, promise);
  return promise;
};

// ─── Prefetch (fire-and-forget warm-up) ──────────────────────────────────────
export const prefetch = (...endpoints) => {
  endpoints.forEach(ep => cachedGet(ep, CACHE_TTL.static, CACHE_TTL.session).catch(() => {}));
};

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const signupUser = async (userData) => {
  clearApiCache();
  return request('/auth/signup', { method: 'POST', body: JSON.stringify(userData) });
};

export const loginUser = async (credentials) => {
  clearApiCache();
  return request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
};

export const googleSignin = async (idToken) => {
  clearApiCache();
  return request('/auth/google', { method: 'POST', body: JSON.stringify({ idToken }) });
};

export const getCurrentUser = () => cachedGet('/auth/me', CACHE_TTL.dynamic);

// ─── User Profile ─────────────────────────────────────────────────────────────
const getEmail = () => {
  try { return JSON.parse(localStorage.getItem('rankquest_user') || '{}').email || ''; }
  catch { return ''; }
};

export const getUserProfile = () => {
  const email = getEmail();
  if (!email) return Promise.resolve(null);
  return cachedGet(`/users/profile-by-email?email=${encodeURIComponent(email)}`, CACHE_TTL.dynamic);
};

export const updateUserProfile = async (data) => {
  clearApiCache();
  return request(`/users/profile?email=${encodeURIComponent(getEmail())}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// ─── Problems ─────────────────────────────────────────────────────────────────
export const getAllProblems = () => cachedGet('/problems', CACHE_TTL.static);
export const getProblemById = (id) => cachedGet(`/problems/${id}`, CACHE_TTL.static);

// ─── Sheets ───────────────────────────────────────────────────────────────────
export const getAllSheets   = () => cachedGet('/sheets', CACHE_TTL.static);
export const getSheets     = getAllSheets;
export const getSheetBySlug = (slug) => cachedGet(`/sheets/${slug}`, CACHE_TTL.static);
export const getProblemsBySheet = (slug) => cachedGet(`/sheets/${slug}/problems`, CACHE_TTL.static);

// ─── Patterns ─────────────────────────────────────────────────────────────────
export const getAllPatterns = () => cachedGet('/patterns', CACHE_TTL.static);
export const getPatternBySlug = (slug) => cachedGet(`/patterns/${slug}`, CACHE_TTL.static);
export const getProblemsByPattern = (slug) => cachedGet(`/patterns/${slug}/problems`, CACHE_TTL.static);

// ─── Resources ────────────────────────────────────────────────────────────────
export const getResources = (category = 'all') =>
  cachedGet(`/resources?category=${encodeURIComponent(category)}`, CACHE_TTL.static);

// ─── Submissions ──────────────────────────────────────────────────────────────
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
    const res = await cachedGet(
      `/submissions/my-solved?email=${encodeURIComponent(email)}`,
      CACHE_TTL.dynamic
    );
    return Array.isArray(res) ? res : [];
  } catch { return []; }
};

export const toggleSolveStatus = async (problemId, isSolved) => {
  // Clear API cache so solved list and activity heatmap update instantly
  clearApiCache();
  const email = getEmail();
  return request(`/submissions/${problemId}?email=${encodeURIComponent(email)}`, {
    method: 'POST',
    body: JSON.stringify({ status: isSolved ? 'ACCEPTED' : 'UNSOLVED' }),
  });
};

// ─── Rankings ─────────────────────────────────────────────────────────────────
export const getGlobalRankings  = () => cachedGet('/rankings/global',  CACHE_TTL.live);
export const getCollegeRankings = (college) =>
  cachedGet(`/rankings/college?college=${encodeURIComponent(college)}`, CACHE_TTL.live);

// ─── Activity & Heatmap ───────────────────────────────────────────────────────
export const getActivityHeatmap = async () => {
  const email = getEmail();
  if (!email) return {};
  try {
    const res = await cachedGet(
      `/activity/heatmap?email=${encodeURIComponent(email)}`,
      CACHE_TTL.dynamic
    );
    if (res && res.heatmapData) {
      return res.heatmapData;
    }
    return (typeof res === 'object' && res && !Array.isArray(res)) ? res : {};
  } catch { return {}; }
};

