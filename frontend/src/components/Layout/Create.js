import React, { useState } from 'react';
import { CheckCircleIcon, StopCircleIcon } from '@heroicons/react/24/outline';
import Modal from '../../shared/Modal';
import CreateTicket from './CreateTicket';

const Create = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ticketType, setTicketType] = useState('task');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const buttons = [{
        type: 'task',
        color: 'text-green-700',
        icon: <CheckCircleIcon className='w-5 h-5' />
    },
    {
        type: 'bug',
        color: 'text-red-700',
        icon: <StopCircleIcon className='w-5 h-5' />
    },]

    const openModal = (type) => {
        setTicketType(type);
        setIsModalOpen(true)
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsOpen(false);
    }

    const handleCreateOption = (option) => {
        console.log(`Create ${option} selected`);
        closeModal(); // Close modal after selection
    };

    return (
        <div className="relative">
            {/* Button to open modal */}
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={toggleDropdown}
            >
                Create
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-32 bg-white border shadow-lg rounded-lg z-10">
                    {buttons?.map(btn => (
                        <button
                            key={btn?.type}
                            onClick={() => openModal(btn?.type)}
                            className={`w-full flex flex-row items-center gap-2 p-2 hover:bg-gray-100 ${btn?.color}`}>
                            {btn?.icon} <span className='capitalize'>{btn?.type}</span>
                        </button>
                    ))}
                </div>
            )}
            <Modal title={`Create ${ticketType}`} isOpen={isModalOpen} onClose={() => { closeModal() }}>
                <CreateTicket ticketType={ticketType} closeModal={closeModal} />
            </Modal>
        </div>
    );
};

export default Create;
