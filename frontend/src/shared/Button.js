// components/Button.js
import React from 'react';

const Button = ({ children, type = 'button', onClick, variant = 'primary', size = 'md', disabled = false }) => {
    const baseStyle = 'rounded-md font-medium focus:outline-none focus:ring transition duration-200';

    const variantStyles = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-300',
        secondary: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-300',
        danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-300',
        outline: 'border border-gray-500 text-gray-500 hover:bg-gray-100 focus:ring-gray-300'
    };

    const sizeStyles = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg'
    };

    const classes = `${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

    return (
        <button type={type} className={classes} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
