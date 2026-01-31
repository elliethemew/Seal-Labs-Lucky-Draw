export interface Fortune {
    id: number;
    message: string;
    type: 'wealth' | 'health' | 'love' | 'career' | 'general';
}

export const FORTUNES: Fortune[] = [
    // --- WEALTH (Tiền tài) ---
    { id: 1, type: 'wealth', message: "Wealth flows in like water, fortune stays like a mountain." },
    { id: 2, type: 'wealth', message: "Your pockets will be heavy with gold this year." },
    { id: 3, type: 'wealth', message: "Investment in yourself pays the best interest. ROI +1000%!" },
    { id: 4, type: 'wealth', message: "Bonus season is coming. Prepare your wallet!" },
    { id: 5, type: 'wealth', message: "Unexpected financial gains are heading your way." },
    { id: 6, type: 'wealth', message: "A golden opportunity will transform your finances." },
    { id: 7, type: 'wealth', message: "Money follows value. You are creating immense value this year." },
    { id: 8, type: 'wealth', message: "Your side hustle might just become your main hustle." },
    { id: 9, type: 'wealth', message: "Prosperity is not just a wish, it's your reality in 2026." },
    { id: 10, type: 'wealth', message: "Green candles only for your portfolio this year!" },
    { id: 11, type: 'wealth', message: "May your bank account number look like a phone number." },
    { id: 12, type: 'wealth', message: "Smart decisions today will lead to luxury tomorrow." },
    { id: 13, type: 'wealth', message: "The God of Wealth is knocking at your door." },
    { id: 14, type: 'wealth', message: "Financial freedom is closer than you think." },

    // --- CAREER (Sự nghiệp) ---
    { id: 15, type: 'career', message: "A promotion is on the horizon. Keep pushing forward!" },
    { id: 16, type: 'career', message: "Your hard work will finally be recognized by those who matter." },
    { id: 17, type: 'career', message: "New opportunities will knock on your door. Be ready to open it." },
    { id: 18, type: 'career', message: "You will ship a feature that users absolutely love." },
    { id: 19, type: 'career', message: "Bug-free code and seamless deploys await you." },
    { id: 20, type: 'career', message: "Your leadership skills will shine in a critical moment." },
    { id: 21, type: 'career', message: "A difficult project will turn into your greatest triumph." },
    { id: 22, type: 'career', message: "Networking will open a door you didn't know existed." },
    { id: 23, type: 'career', message: "You are the MVP of the team this year." },
    { id: 24, type: 'career', message: "Creativity will flow through you effortlessly." },
    { id: 25, type: 'career', message: "That 'impossible' deadline? You'll crush it with time to spare." },
    { id: 26, type: 'career', message: "Your code reviews will be legendary for their insight." },
    { id: 27, type: 'career', message: "A mentor will appear to guide you to the next level." },

    // --- LOVE (Tình duyên) ---
    { id: 28, type: 'love', message: "Love is in the air. Open your heart to new possibilities." },
    { id: 29, type: 'love', message: "A surprise encounter will bring joy to your heart." },
    { id: 30, type: 'love', message: "Your charm is irresistible this year." },
    { id: 31, type: 'love', message: "Relationships—new or old—will bloom beautifully." },
    { id: 32, type: 'love', message: "Someone is secretly admiring your dedication." },
    { id: 33, type: 'love', message: "Harmony and understanding will define your connections." },
    { id: 34, type: 'love', message: "A romantic gesture will sweep you off your feet." },
    { id: 35, type: 'love', message: "Self-love is the best love. Treat yourself!" },
    { id: 36, type: 'love', message: "You will find warmth in the most unexpected places." },
    { id: 37, type: 'love', message: "Laughter is the key to your heart this year." },

    // --- HEALTH (Sức khỏe) ---
    { id: 38, type: 'health', message: "Good health is your greatest wealth. Cherish it." },
    { id: 39, type: 'health', message: "Energy and vitality will support all your endeavors." },
    { id: 40, type: 'health', message: "Sleep well, eat well, code well." },
    { id: 41, type: 'health', message: "Mental clarity will be your superpower." },
    { id: 42, type: 'health', message: "Your fitness goals are within reach. Keep moving!" },
    { id: 43, type: 'health', message: "Radiant health will make you glow from within." },
    { id: 44, type: 'health', message: "Take a deep breath. Inner peace is yours." },
    { id: 45, type: 'health', message: "Balance is key. Work hard, rest harder." },

    // --- GENERAL (Vạn sự như ý) ---
    { id: 46, type: 'general', message: "Every day is a new beginning. Make this year count!" },
    { id: 47, type: 'general', message: "May all your wishes come true in the Year of the Horse!" },
    { id: 48, type: 'general', message: "Luck is what happens when preparation meets opportunity." },
    { id: 49, type: 'general', message: "Joy will find you in the smallest moments." },
    { id: 50, type: 'general', message: "You are exactly where you need to be." },
    { id: 51, type: 'general', message: "Adventure awaits. Say yes to the unknown." },
    { id: 52, type: 'general', message: "Your positivity is contagious. Spread the light." },
    { id: 53, type: 'general', message: "A year of breakthroughs and blessings." },
    { id: 54, type: 'general', message: "The universe is conspiring in your favor." },
    { id: 55, type: 'general', message: "Simplicity is the ultimate sophistication this year." }
];
