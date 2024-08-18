// components/Wizard.js
import React, { useState } from 'react';

const Wizard = ({ steps }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div>
            <div className="mb-4">
                {steps[currentStep].content}
            </div>
            <div className="flex justify-between">
                <button
                    onClick={handlePrevious}
                    className={`px-4 py-2 rounded-md ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'bg-gray-500 text-white hover:bg-gray-600'
                        }`}
                    disabled={currentStep === 0}
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default Wizard;
