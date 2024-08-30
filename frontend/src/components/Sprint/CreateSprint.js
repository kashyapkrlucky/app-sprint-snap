import React, { useState } from 'react';
import Input from '../../shared/Input';

const CreateSprint = ({ createSprint, projectId, modalAction }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSprint({
      variables: formData
    });
    modalAction(false);
  };

  return (
    <form className='w-96' onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Sprint Name
        </label>
        <Input type="text"
          name="name"
          id="name"
          value={formData?.name}
          onChange={handleChange} />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={formData?.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows="4"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white rounded-lg py-2 px-4 font-medium hover:bg-indigo-700 transition duration-300"
      >
        Create Sprint
      </button>
    </form>
  );
};

export default CreateSprint;
