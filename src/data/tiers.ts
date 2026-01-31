import type { ReactNode } from 'react';

export interface Tier {
    min: number;
    max: number;
    title: string;
    message: string;
    icon?: ReactNode; // We can add icons later if needed, keeps it flexible
}

// Helper to determine tier properties based on amount
export const getTier = (amount: number): Tier => {
    // Specific Values Check (High Priority)

    // 300,000
    if (amount === 300000) return {
        min: 300000, max: 300000,
        title: "The Market Mover",
        message: "Dominance confirmed. You just drained the liquidity pool."
    };

    // 200,000
    if (amount === 200000) return {
        min: 200000, max: 200000,
        title: "Series A Funded",
        message: "Alpha secured. Your portfolio is looking exceptional."
    };

    // 100,000
    if (amount === 100000) return {
        min: 100000, max: 100000,
        title: "The Smart Contract",
        message: "Reliable. Essential. You are the backbone of the network."
    };

    // 99,999
    if (amount === 99999) return {
        min: 99999, max: 99999,
        title: "The Precision Sniper",
        message: "Calculated perfection. You do not miss."
    };

    // 88,888
    if (amount === 88888) return {
        min: 88888, max: 88888,
        title: "The Prosperity King",
        message: "Spiritual bull market. Expect green candles all year."
    };

    // 77,777
    if (amount === 77777) return {
        min: 77777, max: 77777,
        title: "The Jackpot",
        message: "The house always wins. Today, you are the house."
    };

    // 66,666
    if (amount === 66666) return {
        min: 66666, max: 66666,
        title: "The Smooth Operator",
        message: "Unstoppable flow. The universe is optimizing your route."
    };

    // 60,000
    if (amount === 60000) return {
        min: 60000, max: 60000,
        title: "Stablecoin Yield",
        message: "A sophisticated hedge against volatility. Stay liquid."
    };

    // 50,000 (Default / Low)
    if (amount === 50000) return {
        min: 50000, max: 50000,
        title: "Community Airdrop",
        message: "Proof of Attendance. Prestige over price."
    };

    // Fallback for any other amounts
    return {
        min: 0, max: 0,
        title: "Verifiable Randomness",
        message: "Entropy is working in your favor."
    };
};
