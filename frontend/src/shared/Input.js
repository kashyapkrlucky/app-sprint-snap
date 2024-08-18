// components/Input.js
import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, size = 'md', disabled = false }) => {
    const baseStyle = 'block w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out';

    const sizeStyles = {
        sm: 'p-2 text-sm',
        md: 'p-3',
        lg: 'p-4 text-lg'
    };

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${baseStyle} ${sizeStyles[size]} ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
            disabled={disabled}
        />
    );
};

export default Input;
