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
    const [stage, setStage] = useState<'front' | 'back' | 'result'>('front');

    useEffect(() => {
        if (stage === 'result' && result?.status === 'SUCCESS') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FF0000', '#FFFFFF'] // Gold, Red, White
            });
        }
    }, [stage, result]);

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
                setStage('front');
            } else {
                setError(res.message || "Something went wrong.");
            }
        } catch (err) {
            setError("Failed to connect. Please check your internet.");
        } finally {
            setLoading(false);
        }
    };

    if (result && showEnvelope) {
        return (
            <div className="flex flex-col items-center justify-center w-full min-h-[400px]">
                <AnimatePresence mode="wait">
                    {stage === 'front' ? (
                        <motion.div
                            key="front"
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{
                                rotateY: 90,
                                opacity: 0,
                                scale: 0.9,
                                transition: { duration: 0.3, ease: "easeIn" }
                            }}
                            className="cursor-pointer perspective-1000"
                            onClick={() => setStage('back')}
                            whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
                        >
                            <div className="h-[400px] aspect-[363/680] rounded-lg relative flex items-center justify-center transition-all duration-300 shadow-xl group-hover:shadow-2xl overflow-hidden">
                                <img
                                    src="/envelope.png"
                                    alt="Lucky Envelope Front"
                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                    onError={(e) => {
                                        // Fallback to CSS style if image is missing
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement!.classList.add('w-64', 'bg-gradient-to-br', 'from-seal-red', 'to-seal-dark', 'border-2', 'border-seal-gold');
                                        e.currentTarget.parentElement!.querySelector('.envelope-fallback')!.classList.remove('hidden');
                                    }}
                                />

                                {/* Fallback Content (Hidden by default, shows on error) */}
                                <div className="envelope-fallback hidden absolute inset-0 w-full h-full flex flex-col items-center justify-center">
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/shattered-island.png')]"></div>
                                    <div className="text-center z-10 text-seal-gold">
                                        <div className="text-6xl mb-4 animate-bounce">🧧</div>
                                        <p className="font-display font-bold text-xl uppercase tracking-widest">Flip Over</p>
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-medium text-white/90 uppercase tracking-widest">Flip Over</span>
                                </div>
                            </div>
                        </motion.div>
                    ) : stage === 'back' ? (
                        <motion.div
                            key="back"
                            initial={{ rotateY: -90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{
                                rotateY: 90,
                                opacity: 0,
                                scale: 0.9,
                                transition: { duration: 0.3, ease: "easeIn" }
                            }}
                            transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 15 }}
                            className="cursor-pointer perspective-1000"
                            onClick={() => setStage('result')}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="h-[400px] aspect-[363/680] rounded-lg relative flex items-center justify-center transition-all duration-300 shadow-xl group-hover:shadow-2xl overflow-hidden">
                                <img
                                    src="/envelope-back.png"
                                    alt="Lucky Envelope Back"
                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                    onError={(e) => {
                                        // Fallback if missing back image
                                        e.currentTarget.parentElement!.classList.add('w-64', 'bg-seal-red');
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-medium text-white/90 uppercase tracking-widest">Open Now</span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ rotateY: -90, opacity: 0 }}
                            animate={{
                                rotateY: 0,
                                opacity: 1,
                                transition: { duration: 0.4, type: "spring", stiffness: 100, damping: 15 }
                            }}
                            className="flex flex-col items-center gap-6 perspective-1000"
                        >
                            <Receipt result={result} />
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                                className="text-seal-ivory/60 text-sm max-w-xs text-center"
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
        <div className="w-[92vw] max-w-[560px] mx-auto">
            <div className="text-center mb-6">
                <h2 className="type-h2 text-seal-ivory mb-1">Lucky Money</h2>
                <span className="inline-block px-2 py-0.5 rounded-full bg-seal-ivory/5 text-seal-ivory/40 text-[9px] uppercase font-bold tracking-[0.2em] mb-4 border border-seal-ivory/10">
                    Lì Xì
                </span>
                <p className="type-body text-seal-ivory/90 text-sm">Enter your company email to open your envelope.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <input
                        type="email"
                        placeholder="ellie@seallabs.xyz"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={loading}
                        className={clsx(
                            "w-full px-6 h-12 rounded-2xl bg-white/5 border border-seal-ivory/30 text-seal-ivory placeholder-seal-ivory/40 focus:outline-none focus:border-seal-ivory/50 focus:shadow-[0_0_20px_rgba(229,198,152,0.1)] transition-all font-sans",
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
                    className="w-full h-14 rounded-2xl bg-seal-ivory text-seal-dark font-bold text-lg shadow-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? 'Checking...' : 'Open Envelope'} <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}

