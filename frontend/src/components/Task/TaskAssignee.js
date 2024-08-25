import React, { useState } from 'react';
import { useAppSelection } from '../../contexts/AppSelectionContext';
import Avatar from '../../shared/Avatar';

const TaskAssignee = ({ name, value, updateValue }) => {
    const { selectedProject } = useAppSelection();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(value);

    const onChange = async (user) => {
        setSelectedUser(user);
        setIsDropdownOpen(false);
        updateValue(name, user?.id);
    };

    return (
        <div className="relative flex flex-col items-center">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex flex-row gap-1 text-blue-500 hover:text-blue-600"
            >
                {selectedUser ? <><Avatar user={selectedUser} size='xs' /><span>{selectedUser?.fullName}</span></> : "Unassigned"}
            </button>

            {isDropdownOpen && (
                <div className="absolute z-10 left-0 mt-6 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                    <ul>
                        {selectedProject?.members?.map((user) => (
                            <li
                                key={user.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => onChange(user)}
                            >
                                {user?.fullName}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TaskAssignee;
