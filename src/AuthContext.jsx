import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const API_BASE = 'http://localhost:3001';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('aevum_token') || '');
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('aevum_user');
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        if (token) localStorage.setItem('aevum_token', token);
        else localStorage.removeItem('aevum_token');
    }, [token]);

    useEffect(() => {
        if (user) localStorage.setItem('aevum_user', JSON.stringify(user));
        else localStorage.removeItem('aevum_user');
    }, [user]);

    const authFetch = async (path, options = {}) => {
        const headers = {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        };
        if (token) headers.Authorization = `Bearer ${token}`;

        const response = await fetch(`${API_BASE}${path}`, {
            ...options,
            headers
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Request failed');
        return data;
    };

    const login = async (email, password) => {
        const data = await authFetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        setToken(data.token);
        setUser(data.user);
        return data.user;
    };

    const signup = async (name, email, password) => {
        const data = await authFetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        });
        setToken(data.token);
        setUser(data.user);
        return data.user;
    };

    const logout = () => {
        setToken('');
        setUser(null);
    };

    const value = useMemo(() => ({
        user,
        token,
        isAuthenticated: Boolean(token && user),
        authFetch,
        login,
        signup,
        logout
    }), [token, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
