import React from 'react';

const SprintHeader = ({sprint}) => {

  return (
    <div className="bg-white shadow-md py-6 px-6 mb-4 flex flex-col md:flex-row justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-700">{sprint.name}</h1>
        <p className="text-gray-500">
          {sprint.startDate} - {sprint.endDate}
        </p>
      </div>
      <div className="w-full md:w-1/3 mt-4 md:mt-0">
        <div className="text-gray-500 text-sm mb-2">Progress</div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${sprint.progress}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600 mt-1">{sprint.progress}% Complete</div>
      </div>
    </div>
  );
};

export default SprintHeader;
