import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseClass = 'btn';
    const variantClass = variant === 'ghost' ? 'btn-ghost' : `btn-${variant}`;
    const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg p-4' : '';
    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
