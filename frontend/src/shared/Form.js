// components/Form.js
import React from 'react';

const Form = ({ onSubmit, children }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {children}
        </form>
    );
};

export default Form;
