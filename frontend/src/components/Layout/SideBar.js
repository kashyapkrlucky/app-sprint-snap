// components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

import { ArrowLeftCircleIcon, ArrowRightCircleIcon, ChartBarSquareIcon, Cog8ToothIcon, QueueListIcon, RectangleGroupIcon, Square2StackIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex flex-col ${isOpen ? 'w-64' : 'w-16'} h-screen bg-gray-800 text-white transition-width duration-300`}>
            <div className="flex flex-row items-center justify-between px-4 py-3">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-400 hover:text-white focus:outline-none">
                    {isOpen ? <ArrowLeftCircleIcon className='w-8 h-8' /> : <ArrowRightCircleIcon className='w-8 h-8' />}
                </button>
                <p className={`text-xl font-bold transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}>SprintSnap</p>
            </div>

            <nav className="mt-5 p-2">
                <Link to="/backlog" className="flex flex-row gap-2 items-center py-2 px-3 hover:bg-gray-700 transition-colors rounded-lg">
                    <RectangleGroupIcon className='w-6 h-6' />
                    <span className={`text-sm ${isOpen ? 'block' : 'hidden'}`}>Backlog</span>
                </Link>

                <Link to="/sprint/active" className="flex flex-row gap-2 items-center py-2 px-3 hover:bg-gray-700 transition-colors rounded-lg">
                    <QueueListIcon className='w-6 h-6' />
                    <span className={`text-sm ${isOpen ? 'block' : 'hidden'}`}>Active Sprints</span>
                </Link>

                <Link to="/charts" className="flex flex-row gap-2 items-center py-2 px-3 hover:bg-gray-700 transition-colors rounded-lg">
                    <ChartBarSquareIcon className='w-6 h-6' />
                    <span className={`text-sm ${isOpen ? 'block' : 'hidden'}`}>Charts</span>
                </Link>

                <Link to="/projects" className="flex flex-row gap-2 items-center py-2 px-3 hover:bg-gray-700 transition-colors rounded-lg">
                    <Square3Stack3DIcon className='w-6 h-6' />
                    <span className={`text-sm ${isOpen ? 'block' : 'hidden'}`}>Charts</span>
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
