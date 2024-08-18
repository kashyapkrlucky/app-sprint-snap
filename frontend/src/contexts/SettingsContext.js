import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {

    const [settings, setSettings] = useState({
        theme: 'light',
        notifications: true
    });

    useEffect(() => {
        // On page load, check if the user is already logged in
        const storedSettings = JSON.parse(localStorage.getItem('settings'));

        if (storedSettings) {
            setSettings(storedSettings);  // Restore user state
        }
    }, []);


    const saveSettings = (data, token) => {
        localStorage.setItem('settings', JSON.stringify(data));
        setSettings(data);  // Update user state
    };

    return (
        <SettingsContext.Provider value={{ settings, saveSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}