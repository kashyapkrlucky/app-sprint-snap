// components/DatePicker.js
import React, { useState } from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';

const DatePicker = ({ selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    setCurrentDate(date);
    onDateChange(date);
  };

  const handleToggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <input
        type="date"
        value={currentDate.toISOString().split('T')[0]}
        onChange={handleDateChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleToggleCalendar}
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <CalendarIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white shadow-lg border rounded-md">
          {/* Custom calendar UI goes here */}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
