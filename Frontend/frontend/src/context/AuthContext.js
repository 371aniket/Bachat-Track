import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTH_API } from '../api/apiEndpoints';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  axios.defaults.baseURL = 'https://bachat-track-backend.onrender.com';

  // Axios interceptor to attach token to every request
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUserProfile(token);
    }
  }, [token]);

  const fetchUserProfile = async (currentToken = token) => {
    try {
      const response = await axios.get(AUTH_API.PROFILE, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      navigate('/login');
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(AUTH_API.LOGIN, { username, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      navigate('/');
    } catch (error) {
      // Optionally handle login error
    }
  };

  const signup = async (formData) => {
    try {
      await axios.post(AUTH_API.SIGNUP, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/login');
    } catch (error) {
      if (error.response?.status === 409) {
        // Optionally handle user already exists
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const refreshUser = () => {
    if (token) {
      fetchUserProfile(token);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
