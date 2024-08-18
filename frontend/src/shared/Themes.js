// themes.js
export const themes = {
    light: {
        background: 'bg-white',
        text: 'text-gray-900',
        border: 'border-gray-300',
    },
    dark: {
        background: 'bg-gray-900',
        text: 'text-white',
        border: 'border-gray-700',
    },
    // Add more themes as needed
};



export const lightTheme = {
    primary: 'bg-blue-500 text-white', // Primary button/background color
    secondary: 'bg-gray-200 text-gray-900', // Secondary button/background color
    background: 'bg-gray-100', // Background color for main content
    text: 'text-gray-900', // Primary text color
    subText: 'text-gray-600', // Primary text color
    accent: 'bg-yellow-400 text-gray-900', // Accent color for highlights
    border: 'border-gray-300', // Border color for elements
    link: 'text-blue-600 hover:text-blue-800', // Link color with hover state
    muted: 'text-gray-500', // Muted text color for subtle content
    card: 'bg-white border border-gray-300', // Card background and shadow
    input: 'bg-gray-100 text-gray-900 border border-gray-300', // Input fields styling
    success: 'bg-green-500 text-white', // Success messages/buttons
    error: 'bg-red-500 text-white', // Error messages/buttons
    warning: 'bg-yellow-500 text-gray-900', // Warning messages/buttons
};

export const darkTheme = {
    primary: 'bg-blue-600 text-white', // Darker primary button/background color
    secondary: 'bg-gray-700 text-gray-200', // Darker secondary button/background color
    background: 'bg-gray-900', // Darker background for main content
    text: 'text-gray-100', // Light text color for contrast on dark backgrounds
    subText: 'text-gray-300', // Primary text color
    accent: 'bg-yellow-500 text-gray-900', // Accent color with better contrast on dark
    border: 'border-gray-600', // Darker border color for elements
    link: 'text-blue-400 hover:text-blue-600', // Link color with hover state on dark
    muted: 'text-gray-400', // Muted text color for subtle content on dark
    card: 'bg-gray-800 border border-gray-600', // Card background and shadow for dark theme
    input: 'bg-gray-700 text-gray-200 border border-gray-600', // Input fields styling for dark theme
    success: 'bg-green-600 text-white', // Success messages/buttons
    error: 'bg-red-600 text-white', // Error messages/buttons
    warning: 'bg-yellow-600 text-gray-900', // Warning messages/buttons
};