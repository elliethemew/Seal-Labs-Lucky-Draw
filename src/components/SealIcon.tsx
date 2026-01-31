import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface SealIconProps {
    children: ReactNode;
    size?: number; // Container size
    variant?: 'flat' | 'foil' | 'embossed';
    className?: string;
}

export function SealIcon({ children, size = 80, variant = 'embossed', className }: SealIconProps) {
    return (
        <div
            className={clsx(
                "rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-500 ease-spring group-hover:scale-105 group-hover:shadow-lg",
                // Deep Emboss: Darker gradient + Deep inset shadow + Soft drop shadow
                variant === 'embossed' && "bg-gradient-to-br from-[#A01D20] to-[#500A0B] shadow-[inset_0_2px_6px_rgba(0,0,0,0.6),0_8px_16px_rgba(0,0,0,0.2)]",
                variant === 'foil' && "bg-gradient-to-br from-seal-gold/20 to-seal-gold/5 border border-seal-gold/10",
                className
            )}
            style={{ width: size, height: size }}
        >
            {/* 1. Outer Hairline Ring (Minted Edge) */}
            <div className="absolute inset-[2px] rounded-full border border-seal-gold/30 opacity-100" />

            {/* 2. Inner Ring (Depth detail) */}
            <div className="absolute inset-[6px] rounded-full border border-seal-gold/10 opacity-100" />

            {/* 3. Radial Top Sheen (Metal/Lacquer reflection) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_50%)] pointer-events-none" />

            {/* 4. Bottom Reflected Light (Subtle bounce) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,165,74,0.1),transparent_50%)] pointer-events-none" />

            {/* Icon Container - Centered & Scaled */}
            <div className="relative z-10 text-seal-gold drop-shadow-sm flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}
