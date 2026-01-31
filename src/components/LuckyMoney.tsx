import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertCircle, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import confetti from 'canvas-confetti';
import { claimLuckyMoney, type ClaimResult } from '../api/client';
import { Receipt } from './Receipt';

export function LuckyMoney() {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ClaimResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showEnvelope, setShowEnvelope] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        if (isRevealed && result?.status === 'SUCCESS') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FF0000', '#FFFFFF'] // Gold, Red, White
            });
        }
    }, [isRevealed, result]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!code) {
            setError("Please enter your Code");
            return;
        }

        setLoading(true);
        try {
            const res = await claimLuckyMoney(code);
            if (res.status === 'SUCCESS' || res.status === 'ALREADY_CLAIMED') {
                setResult(res);
                setShowEnvelope(true);
                setIsRevealed(false);
            } else {
                setError(res.message || "Something went wrong.");
            }
        } catch (err) {
            setError("Failed to connect. Please check your internet.");
        } finally {
            setLoading(false);
        }
    };

    const handleReveal = () => {
        setIsRevealed(true);
    };

    if (result && showEnvelope) {
        return (
            <div className="flex flex-col items-center justify-center w-full min-h-[400px]">
                <AnimatePresence mode="wait">
                    {!isRevealed ? (
                        <motion.div
                            key="envelope"
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.5, rotateY: 180 }}
                            className="cursor-pointer"
                            onClick={handleReveal}
                            whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <div className="w-64 h-80 bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-2xl relative flex items-center justify-center border-2 border-seal-gold ring-4 ring-red-900 overflow-hidden transform-gpu">
                                {/* Envelope Pattern */}
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/shattered-island.png')]"></div>

                                <div className="text-center z-10 text-seal-gold">
                                    <div className="text-6xl mb-4 animate-bounce">🧧</div>
                                    <p className="font-display font-bold text-xl uppercase tracking-widest">Tap to Open</p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="receipt"
                            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className="flex flex-col items-center gap-6"
                        >
                            <Receipt result={result} />
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 1 } }}
                                className="text-seal-cream/60 text-sm max-w-xs text-center"
                            >
                                Or screenshot manually if sharing fails.
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold font-display text-seal-gold mb-2">Claim Lucky Money</h2>
                <p className="text-seal-cream/70 text-sm">Enter your Employee Code (e.g. SEAL01) to receive a random lucky envelope.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="SEAL01"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        disabled={loading}
                        className={clsx(
                            "w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-seal-gold transition-all uppercase tracking-widest font-mono",
                            error && "border-red-500 focus:ring-red-500"
                        )}
                    />
                    {loading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Loader2 className="w-5 h-5 animate-spin text-seal-gold" />
                        </div>
                    )}
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm flex items-center gap-2 px-2"
                    >
                        <AlertCircle className="w-4 h-4" /> {error}
                    </motion.div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-seal-gold to-yellow-500 text-seal-dark font-bold text-lg shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? 'Checking...' : 'Open Envelope'} <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}
