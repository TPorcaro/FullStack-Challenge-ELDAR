import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ children, onClick = () => { }, variant = 'primary', size = 'medium', className, ...props }) => {
    const baseStyle = 'px-4 py-2 rounded focus:outline-none focus:ring-2 shadow-sm';

    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
        success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500'
    };

    const sizeStyles = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
    };

    const classes = classNames(
        baseStyle,
        variantStyles[variant],
        sizeStyles[size],
        className
    );

    return (
        <button className={classes} onClick={onClick} {...props}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    className: PropTypes.string,
};


export default Button;
