import React from 'react';

const BacklogHeader = ({ formAction }) => {
    return (
        <div className="py-4 px-6 flex justify-end items-center">
            {/* <h1 className="text-2xl font-bold text-gray-700">Backlog</h1> */}

            {/* Search Bar */}
            <div className="flex items-center space-x-4">
                <button className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700' onClick={() => formAction(true)}>Create Sprint</button>
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="border border-gray-300 rounded-lg px-4 py-2"
                />
            </div>
        </div>
    );
};

export default BacklogHeader;
