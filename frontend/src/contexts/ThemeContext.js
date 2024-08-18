// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { themes } from '../shared/Themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light); // Default theme

    const updateTheme = (themeName) => {
        setTheme(themes[themeName] || themes.light); // Fallback to light theme if not found
    };

    useEffect(() => {
        // Optionally, load initial theme from local storage or API
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            updateTheme(savedTheme);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
