import type { FC } from 'react';

// Gofka Logo Component
const GofkaLogo: FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            viewBox="0 0 200 200"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            <path d="M100 25C113.81 25 125 36.19 125 50V62.5H75V50C75 36.19 86.19 25 100 25Z" />
            <path d="M137.5 68.75C144.4 68.75 150 74.35 150 81.25V93.75H137.5V68.75Z" />
            <path d="M62.5 68.75C55.6 68.75 50 74.35 50 81.25V93.75H62.5V68.75Z" />
            <path d="M100 75C120.71 75 137.5 91.79 137.5 112.5V125H62.5V112.5C62.5 91.79 79.29 75 100 75Z" />
            <path d="M118.75 100C118.75 105.18 114.58 109.38 109.38 109.38H90.62C85.42 109.38 81.25 105.18 81.25 100C81.25 94.82 85.42 90.62 90.62 90.62H109.38C114.58 90.62 118.75 94.82 118.75 100Z" />
            <path d="M125 131.25H75V150C75 163.81 86.19 175 100 175C113.81 175 125 163.81 125 150V131.25Z" />
        </svg>
    );
};

export default GofkaLogo;
