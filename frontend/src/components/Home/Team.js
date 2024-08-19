// components/Team.js
import React from 'react';

const Team = ({ team }) => {
    return (
        <div className="bg-white p-4 rounded-lg border">
            <h2 className="text-sm tracking-wide uppercase mb-4">My Team</h2>
            <ul className="flex flex-col gap-4">
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
