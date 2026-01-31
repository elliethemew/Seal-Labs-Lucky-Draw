export interface Tier {
    amount: number;
    title: string;
    message: string;
    icon: string;
}

export const REWARD_TIERS: Tier[] = [
    {
        amount: 300000,
        title: "The Market Mover",
        message: "WHALE ALERT! You just drained the liquidity pool. Dinner is on you tonight—don't try to hide, we can see the transaction on-chain.",
        icon: ""
    },
    {
        amount: 200000,
        title: "Series A Funded",
        message: "Solid funding secured! Not enough to retire, but definitely enough to buy fancy coffee for a week. Your valuation just went up.",
        icon: ""
    },
    {
        amount: 100000,
        title: "The Smart Contract",
        message: "Respectable. Reliable. Solid. This covers your gas fees for the next few transactions. HODL or spend? The choice is yours.",
        icon: ""
    },
    {
        amount: 99999,
        title: "The Precision Sniper",
        message: "So close to 100k, yet so far. This number is hauntingly beautiful. You are the chosen one of the 'Almost' club.",
        icon: ""
    },
    {
        amount: 88888,
        title: "The \"Faat\" (Prosperity) King",
        message: "Maximum Feng Shui achieved! This is actually worth more than 100k in spiritual luck. Go buy a lottery ticket immediately.",
        icon: ""
    },
    {
        amount: 77777,
        title: "The Jackpot",
        message: "77777. You didn't win the biggest prize, but you definitely have the coolest number. It looks like a slot machine glitch in your favor.",
        icon: ""
    },
    {
        amount: 66666,
        title: "The Smooth Operator",
        message: "Loc Loc Loc Loc Loc! Everything runs smooth for you this year. Just don't spend it all on one bubble tea.",
        icon: ""
    },
    {
        amount: 60000,
        title: "The Inflation Adjustment",
        message: "It’s honest work. Enough for a grab bike ride and a banh mi. Keeps the ecosystem balanced.",
        icon: ""
    },
    {
        amount: 50000,
        title: "The Community Airdrop",
        message: "Congratulations! You successfully participated in the testnet. It’s not a lot, but it’s better than getting rug-pulled. Emotional support money.",
        icon: ""
    }
];

export const getTier = (amount: number): Tier => {
    return REWARD_TIERS.find(t => t.amount === amount) || {
        amount,
        title: "Lucky Winner",
        message: "Success! You've claimed your lucky money.",
        icon: ""
    };
};
