import React from 'react';
import Moment from 'react-moment';

const SprintHeader = ({ sprint, points, members }) => {

  return (
    <div className="bg-white shadow-md py-6 px-6 mb-4 flex flex-col md:flex-row justify-between items-center">
      <div className='flex flex-col gap-4'>
        <h1 className="text-2xl font-bold text-gray-700">{sprint.name}</h1>
        <div className="text-gray-500">
          <Moment format="DD/MM/YYYY">{new Date(parseInt(sprint?.startDate)).toISOString()}</Moment>
          <span>--</span>
          <Moment format="DD/MM/YYYY">{new Date(parseInt(sprint?.endDate)).toISOString()}</Moment>
        </div>
        <div className='flex flex-row gap-4'>
          {members?.map((member, index) => (
            <div key={index} className="flex items-center cursor-pointer">
              <p>{member?.fullName}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/3 mt-4 md:mt-0">
        <div className="text-gray-500 text-sm mb-2">Progress</div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${points?.progress}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600 mt-1">{points?.progress}% Complete</div>
      </div>
    </div>
  );
};

export default SprintHeader;
