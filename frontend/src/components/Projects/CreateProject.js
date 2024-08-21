import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { CREATE_PROJECT } from '../../graphql/mutations';
import { generateProjectAbbreviation } from '../../utils/generics';
import { AuthContext } from '../../contexts/AuthContext';
import { GET_PROJECTS } from '../../graphql/queries';

const CreateProject = ({ closeModal }) => {
    const { user } = useContext(AuthContext);
    const [createProject] = useMutation(CREATE_PROJECT, {
        refetchQueries: [{ query: GET_PROJECTS, variables: { userId: user?.id } }]
    });
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        initials: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            formData.initials = generateProjectAbbreviation(formData.name)
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: formData.name,
            description: formData.description,
            startDate: formData.startDate,
            endDate: formData.endDate,
            initials: formData.initials,
            member: user?.id
        }
        createProject({
            variables: payload
        });
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Project Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <p>
                {formData?.initials}
            </p>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows="4"
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date
                </label>
                <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    End Date
                </label>
                <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white rounded-lg py-2 px-4 font-medium hover:bg-indigo-700 transition duration-300"
            >
                Create Project
            </button>
        </form>

    );
};

export default CreateProject;
