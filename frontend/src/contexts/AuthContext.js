import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // On page load, check if the user is already logged in
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (storedUser && token) {
            setUser(storedUser);  // Restore user state
        }

        setLoading(false);
    }, []);

    const login = (userData, token) => {
        // Store the user data and token
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        setUser(userData);  // Update user state
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);  // Clear user state
    };

    const updateUser = (userData) => {
        // Store the user data and token
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);  // Update user state
    };

    return (
        <AuthContext.Provider value={{ user, loading, updateUser, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
