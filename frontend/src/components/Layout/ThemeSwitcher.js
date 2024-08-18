// components/ThemeSwitcher.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const ThemeSwitcher = () => {
    const { theme, updateTheme } = useContext(ThemeContext);

    const handleThemeChange = (e) => {
        const selectedTheme = e.target.value;
        updateTheme(selectedTheme);
        localStorage.setItem('theme', selectedTheme); // Save the theme choice
    };

    return (
        <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Select Theme:</label>
            <select
                value={Object.keys(theme).find((key) => theme[key] === theme.background)} // Ensure the select matches the current theme
                onChange={handleThemeChange}
                className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                {/* Add more options as needed */}
            </select>
        </div>
    );
};

export default ThemeSwitcher;
