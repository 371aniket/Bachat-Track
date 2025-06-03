import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTH_API } from '../api/apiEndpoints'; // We'll fix this too

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Set base URL for Axios once
  axios.defaults.baseURL = 'https://bachat-track-backend.onrender.com';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(AUTH_API.PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(AUTH_API.LOGIN, { username, password });
      localStorage.setItem('token', response.data.token);
      fetchUserProfile(response.data.token); // Safe to refetch after login
      navigate('/');
      window.location.reload(); // Reload statefully
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await axios.post(AUTH_API.SIGNUP, { username, password });
      console.log('Signup response:', response);
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      if (error.response?.status === 409) {
        console.error('User already exists.');
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
