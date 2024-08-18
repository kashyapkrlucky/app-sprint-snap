// components/Team.js
import React from 'react';

const Team = ({ team }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-2xl font-semibold mb-4">Your Team</h2>
            <ul className="grid grid-cols-2 gap-4">
                {team.map((member, index) => (
                    <li key={index} className="bg-gray-100 p-4 rounded-lg flex items-center">
                        <img src={member.avatarUrl} alt={member.fullName} className="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <p className="font-semibold">{member.fullName}</p>
                            <p className="text-gray-600 text-sm">{member.role}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Team;
