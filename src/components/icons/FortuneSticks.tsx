import type { ComponentProps } from 'react';

export function FortuneSticksIcon({ className, ...props }: ComponentProps<'svg'>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Pot Body - Clean Cylinder */}
            <path d="M7 10v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9" />

            {/* Rim - Subtle ellipse */}
            <path d="M7 10c0 1.1 2.24 2 5 2s5-.9 5-2s-2.24-2-5-2s-5 .9-5 2z" />

            {/* Decorative Band (Premium Detail) */}
            <path d="M7 14c0 1.1 2.24 2 5 2s5-.9 5-2" opacity="0.4" />

            {/* Sticks - Minimal & Symmetrical */}
            <path d="M10 8V3" />
            <path d="M12 8V2" />
            <path d="M14 8V3" />
            <path d="M8 9V4" />
            <path d="M16 9V4" />
        </svg>
    );
}
