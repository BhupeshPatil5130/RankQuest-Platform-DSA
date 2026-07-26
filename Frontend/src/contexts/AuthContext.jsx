import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { loginUser, signupUser, getUserProfile, updateUserProfile as updateUserProfileApi, googleSignin } from '../services/apiService';

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  // Load persisted user from localStorage immediately (prevents flash)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('rankquest_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [loading, setLoading] = useState(false);

  // Background session validation on mount
  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem('rankquest_token');
      if (token && user) {
        try {
          const response = await getUserProfile();
          if (response && response.success && response.data) {
            const freshUser = response.data;
            if (JSON.stringify(freshUser) !== JSON.stringify(user)) {
              setUser(freshUser);
              localStorage.setItem('rankquest_user', JSON.stringify(freshUser));
            }
          }
        } catch (error) {
          console.warn("Background session check failed:", error.message);
          // If 401/403, the token is invalid — auto-logout
          if (error.message?.includes('401') || error.message?.includes('403')) {
            logout();
          }
        }
      }
    };
    validateSession();
  }, []);

  /**
   * Login: calls backend, stores JWT token + user profile in localStorage.
   * Backend returns: { success, message, data: { token, user } }
   */
  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await loginUser(credentials);
      if (response.success) {
        const { token, user: userData } = response.data;
        localStorage.setItem('rankquest_token', token);
        localStorage.setItem('rankquest_user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  }

  /**
   * Google OAuth Login: sends the Google ID token to backend for verification.
   * Backend verifies with Google, then find-or-creates user and returns JWT.
   */
  const googleLogin = async (idToken) => {
    setLoading(true);
    try {
      const response = await googleSignin(idToken);
      if (response.success) {
        const { token, user: userData } = response.data;
        localStorage.setItem('rankquest_token', token);
        localStorage.setItem('rankquest_user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Google login failed' };
    } finally {
      setLoading(false);
    }
  }

  /**
   * Register: creates account via backend.
   * Backend returns: { success, message, data: UserProfileResponse }
   */
  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await signupUser(userData);
      if (response.success) {
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (error) {
      return { success: false, error: error.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    localStorage.removeItem('rankquest_token');
    localStorage.removeItem('rankquest_user');
    setUser(null);
  }

  /**
   * Refresh user data from backend — used after submissions to update stats.
   */
  const refreshUser = useCallback(async () => {
    try {
      const response = await getUserProfile();
      if (response && response.success && response.data) {
        const freshUser = response.data;
        setUser(freshUser);
        localStorage.setItem('rankquest_user', JSON.stringify(freshUser));
      }
    } catch (error) {
      console.warn("Failed to refresh user:", error.message);
    }
  }, []);

  /**
   * Update profile: calls backend, updates local state.
   * Backend returns: { success, message, data: UserProfileResponse }
   */
  const updateProfile = async (updates) => {
    try {
      const response = await updateUserProfileApi(updates);
      if (response.success) {
        const updatedUser = response.data;
        setUser(updatedUser);
        localStorage.setItem('rankquest_user', JSON.stringify(updatedUser));
        return { success: true, user: updatedUser };
      }
      return { success: false, error: response.message };
    } catch (error) {
      return { success: false, error: 'Update failed' };
    }
  }

  const value = {
    user,
    loading,
    login,
    googleLogin,
    register,
    logout,
    updateProfile,
    refreshUser,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children} 
    </AuthContext.Provider>
  )
}