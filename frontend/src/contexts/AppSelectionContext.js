import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const AppSelectionContext = createContext();

// Custom hook to use the AppSelectionContext
export const useAppSelection = () => {
    return useContext(AppSelectionContext);
};

// Provider component to manage the selected project, sprint, and board
export const AppSelectionProvider = ({ children }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedSprint, setSelectedSprint] = useState(null);
    const [selectedBoard, setSelectedBoard] = useState(null);

    // Load selections from localStorage when the app initializes
    useEffect(() => {
        const savedProject = localStorage.getItem('selectedProject');
        if (savedProject) setSelectedProject(JSON.parse(savedProject));

        const savedSprint = localStorage.getItem('selectedSprint');
        if (savedSprint) setSelectedSprint(JSON.parse(savedSprint));

        const savedBoard = localStorage.getItem('selectedBoard');
        if (savedBoard) setSelectedBoard(JSON.parse(savedBoard));
    }, []);

    // Save the selected project, sprint, and board to localStorage whenever they change
    useEffect(() => {
        if (selectedProject) {
            localStorage.setItem('selectedProject', JSON.stringify(selectedProject));
        } else {
            localStorage.removeItem('selectedProject');
        }
    }, [selectedProject]);

    useEffect(() => {
        if (selectedSprint) {
            localStorage.setItem('selectedSprint', JSON.stringify(selectedSprint));
        } else {
            localStorage.removeItem('selectedSprint');
        }
    }, [selectedSprint]);

    useEffect(() => {
        if (selectedBoard) {
            localStorage.setItem('selectedBoard', JSON.stringify(selectedBoard));
        } else {
            localStorage.removeItem('selectedBoard');
        }
    }, [selectedBoard]);

    // Context value to be provided to consuming components
    const value = {
        selectedProject,
        setSelectedProject,
        selectedSprint,
        setSelectedSprint,
        selectedBoard,
        setSelectedBoard,
    };

    return (
        <AppSelectionContext.Provider value={value}>
            {children}
        </AppSelectionContext.Provider>
    );
};
