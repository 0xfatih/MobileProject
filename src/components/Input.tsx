import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className={`flex flex-col gap-2 mb-4 ${className}`}>
            {label && <label className="text-sm font-medium text-muted">{label}</label>}
            <input
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all border-neutral-200"
                style={{ borderRadius: 'var(--radius-md)' }}
                {...props}
            />
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
};

export default Input;
