import React, { useState, useContext } from 'react';
import { CREATE_TASK } from '../../graphql/mutations';
import { GET_SPRINTS } from '../../graphql/queries';
import { useAppSelection } from '../../contexts/AppSelectionContext';
import { useMutation, useQuery } from '@apollo/client';
import { AuthContext } from '../../contexts/AuthContext';

const CreateTicket = ({ ticketType, closeModal }) => {
    const [title, setTitle] = useState('');
    const { user } = useContext(AuthContext);
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [selectedSprint, setSelectedSprint] = useState('');

    const { selectedProject } = useAppSelection();

    const { data } = useQuery(GET_SPRINTS, {
        variables: { projectId: selectedProject?.id },
    });

    const [createTask] = useMutation(CREATE_TASK, {
        refetchQueries: [{ query: GET_SPRINTS, variables: { projectId: selectedProject?.id } }]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const ticketData = {
            title,
            description,
            priority,
            sprintId: selectedSprint,
            ticketType,
            reporter: user?.id,
            projectId: selectedProject?.id
        };
        console.log(selectedSprint);
        
        if (selectedSprint) {
            ticketData.sprintId = selectedSprint;
        }

        createTask({
            variables: ticketData
        })

        // Placeholder for actual create ticket logic (API call)
        console.log(`Created a ${ticketType}:`, ticketData);

        // Reset form fields
        setTitle('');
        setDescription('');
        setPriority('Low');
        setSelectedSprint(null);
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-blue-500"
                    placeholder={`Enter ${ticketType} title`}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-blue-500"
                    placeholder={`Enter ${ticketType} description`}
                    rows="4"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Priority</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-blue-500"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Sprint</label>
                <select
                    value={selectedSprint}
                    onChange={(e) => setSelectedSprint(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-blue-500"
                >
                    <option value={''}>None</option>
                    {data?.sprints?.map((sprint) => (
                        <option key={sprint?.id} value={sprint?.id}>
                            {sprint?.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Create {ticketType}
                </button>
            </div>
        </form>
    );
};

export default CreateTicket;
