// components/Accordion.js
import React, { useState } from 'react';

const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            {items.map((item, index) => (
                <div key={index} className="border-b">
                    <button
                        onClick={() => toggleOpen(index)}
                        className="w-full px-4 py-2 text-left bg-gray-200 hover:bg-gray-300 focus:outline-none"
                    >
                        {item.title}
                    </button>
                    {openIndex === index && (
                        <div className="px-4 py-2 bg-white">
                            {item.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
