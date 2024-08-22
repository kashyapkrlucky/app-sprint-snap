import React from 'react';

const BacklogHeader = ({ selectedProject, formAction }) => {
    return (
        <div className="py-4 flex justify-start items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-700">{selectedProject?.name}</h1>
            <button className='bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700' onClick={() => formAction(true)}>Create Sprint</button>
        </div>
    );
};

export default BacklogHeader;
