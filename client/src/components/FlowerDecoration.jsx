/**
 * FlowerDecoration Component
 * Reusable SVG lotus flower decoration for spiritual theme
 */

import React from 'react';
import PropTypes from 'prop-types';

const FlowerDecoration = ({ size = 20, color = 'currentColor', className = '' }) => {
    return (
        <svg
            className={`flower-decoration ${className}`}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Lotus Flower Design */}
            <g>
                {/* Center Circle */}
                <circle cx="12" cy="12" r="2" fill={color} opacity="0.8" />

                {/* Petals */}
                <path
                    d="M12 4C12 4 10 7 10 9C10 10.1 10.9 11 12 11C13.1 11 14 10.1 14 9C14 7 12 4 12 4Z"
                    fill={color}
                    opacity="0.6"
                />
                <path
                    d="M20 12C20 12 17 10 15 10C13.9 10 13 10.9 13 12C13 13.1 13.9 14 15 14C17 14 20 12 20 12Z"
                    fill={color}
                    opacity="0.6"
                />
                <path
                    d="M12 20C12 20 14 17 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 17 12 20 12 20Z"
                    fill={color}
                    opacity="0.6"
                />
                <path
                    d="M4 12C4 12 7 14 9 14C10.1 14 11 13.1 11 12C11 10.9 10.1 10 9 10C7 10 4 12 4 12Z"
                    fill={color}
                    opacity="0.6"
                />

                {/* Diagonal Petals */}
                <path
                    d="M17 7C17 7 14.5 8.5 13.5 10C13 10.8 13.3 11.8 14.1 12.3C14.9 12.8 15.9 12.5 16.4 11.7C17.4 10.2 17 7 17 7Z"
                    fill={color}
                    opacity="0.5"
                />
                <path
                    d="M17 17C17 17 17.4 14.2 16.4 12.7C15.9 11.9 14.9 11.6 14.1 12.1C13.3 12.6 13 13.6 13.5 14.4C14.5 15.9 17 17 17 17Z"
                    fill={color}
                    opacity="0.5"
                />
                <path
                    d="M7 17C7 17 9.5 15.5 10.5 14C11 13.2 10.7 12.2 9.9 11.7C9.1 11.2 8.1 11.5 7.6 12.3C6.6 13.8 7 17 7 17Z"
                    fill={color}
                    opacity="0.5"
                />
                <path
                    d="M7 7C7 7 6.6 9.8 7.6 11.3C8.1 12.1 9.1 12.4 9.9 11.9C10.7 11.4 11 10.4 10.5 9.6C9.5 8.1 7 7 7 7Z"
                    fill={color}
                    opacity="0.5"
                />
            </g>
        </svg>
    );
};

FlowerDecoration.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    className: PropTypes.string,
};

export default FlowerDecoration;
