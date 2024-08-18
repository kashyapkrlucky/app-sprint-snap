// components/Modal.js
import React from 'react';
import { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';

const Modal = ({ isOpen, closeModal, title, children }) => {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeModal}>
                <div className="flex items-center justify-center min-h-screen px-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
                            <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
                            <div className="mt-4">
                                {children}
                            </div>
                            <div className="mt-6 text-right">
                                <button onClick={closeModal} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                                    Close
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
