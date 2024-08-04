import React from 'react';

const Select = ({ label, name, value, options, onChange, required }) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
                    {label}
                </label>
            )}
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={required}
            >
                <option value="" disabled>Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
