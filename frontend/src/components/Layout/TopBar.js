// components/Topbar.js
import React from 'react';

const TopBar = ({ currentProject, user }) => {
    return (
        <div className="bg-white shadow-md flex justify-between items-center px-6 py-3 h-16">
            {/* Project Name */}
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-800">{currentProject}</h1>
            </div>

            {/* Search Bar */}
            <div className="relative w-1/3">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 pl-10 bg-gray-100 text-gray-800 rounded-full focus:outline-none"
                />
                <svg
                    className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"></path>
                </svg>
            </div>

            {/* User Info & Action Menu */}
            <div className="flex items-center space-x-4">
                {/* User Info */}
                <div className="flex items-center space-x-2">
                    <img
                        src={user.avatarUrl}
                        alt={user.fullName}
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="text-gray-800 font-medium">{user.fullName}</span>
                </div>

                {/* Action Menu */}
                <div className="relative">
                    <button className="text-gray-800 focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6m0 6h0"
                            ></path>
                        </svg>
                    </button>
                    {/* Dropdown for actions like Logout */}
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 hidden">
                        <a
                            href="/profile"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            Profile
                        </a>
                        <a
                            href="/settings"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            Settings
                        </a>
                        <a
                            href="/logout"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
