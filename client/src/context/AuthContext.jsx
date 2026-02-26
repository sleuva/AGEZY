import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            loadUser();
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
            setLoading(false);
        }
    }, [token]);

    const loadUser = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/user');
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (err) {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const register = async (formData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            return res.data;
        } catch (err) {
            throw err.response.data;
        }
    };

    const login = async (formData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            return res.data;
        } catch (err) {
            throw err.response.data;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
