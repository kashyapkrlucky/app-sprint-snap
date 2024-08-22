// components/Avatar.js
import React from 'react';

const Avatar = ({ imageUrl, name, size = 'md' }) => {
  const baseStyle = 'border rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold';

  const sizeStyles = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-12 w-12 text-lg',
    lg: 'h-16 w-16 text-xl',
  };

  return (
    <div className={`${baseStyle} ${sizeStyles[size]}`}>
      {imageUrl ? (
        <img className="rounded-full" src={imageUrl} alt={name} />
      ) : (
        <span title={name}>{name ? name.charAt(0) : '?'}</span>
      )}
    </div>
  );
};

export default Avatar;
