// components/Banner.js
import React from 'react';

const Banner = ({ user }) => {
    return (
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold">Welcome, {user.fullName}!</h1>
            <p className="text-lg">Ready to tackle your tasks and projects?</p>
        </div>
    );
};

export default Banner;
