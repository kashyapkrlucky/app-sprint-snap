import React from 'react';

const BacklogHeader = () => {
    return (
        <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-700">Backlog</h1>

            {/* Search Bar */}
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="border border-gray-300 rounded-lg px-4 py-2"
                />

                {/* Filter Buttons */}
                <div className="space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Filter
                    </button>
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
                        Sort
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BacklogHeader;
