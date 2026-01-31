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
        <div className="w-[92vw] max-w-[520px] mx-auto">
            <div className="text-center mb-5">
                <h2 className="type-h2 text-seal-ivory mb-1.5">Lì Xì</h2>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-seal-ivory/5 text-seal-ivory/50 text-[10px] uppercase font-bold tracking-[0.15em] mb-4 border border-seal-ivory/10">
                    One Claim
                </span>
                <p className="type-body text-seal-ivory/90 text-sm">Enter your company email to open your envelope.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                    <input
                        type="email"
                        placeholder="ellie@seallabs.xyz"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={loading}
                        className={clsx(
                            "w-full px-6 py-5 rounded-2xl bg-white/5 border border-seal-ivory/30 text-seal-ivory placeholder-seal-ivory/20 focus:outline-none focus:border-seal-ivory/50 focus:shadow-[0_0_20px_rgba(229,198,152,0.1)] transition-all font-sans",
                            error && "border-red-500 focus:ring-red-500"
                        )}
                    />
                    {loading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Loader2 className="w-5 h-5 animate-spin text-seal-ivory" />
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
                    className="w-full py-5 rounded-2xl bg-seal-ivory text-seal-dark font-bold text-lg shadow-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? 'Checking...' : 'Open Envelope'} <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}
