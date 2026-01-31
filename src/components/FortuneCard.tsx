import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import type { Fortune } from '../data/fortunes';

interface FortuneCardProps {
    onDraw: () => Fortune;
}

export function FortuneCard({ onDraw }: FortuneCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [fortune, setFortune] = useState<Fortune | null>(null);

    const handleDraw = () => {
        if (isFlipped) {
            // Reset
            setIsFlipped(false);
            setTimeout(() => setFortune(null), 300); // Clear after flip back
        } else {
            // Draw
            const newFortune = onDraw();
            setFortune(newFortune);
            setIsFlipped(true);
        }
    };

    return (
        <div className="perspective-1000 w-full max-w-sm mx-auto h-[480px] relative">
            <motion.div
                className="w-full h-full relative preserve-3d cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.1 }}
                onClick={handleDraw}
            >
                {/* Front of Card (The "Back" of the deck - Red envelope style) */}
                {/* Front of Card (The "Back" of the deck - Red envelope style) */}
                <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-2xl border-4 border-seal-gold/30 bg-gradient-to-br from-seal-red to-[#8B0000] flex flex-col items-center justify-center p-8 text-center group">
                    <div className="absolute inset-0 border-[12px] border-double border-seal-gold/20 rounded-3xl pointer-events-none" />
                    <div className="w-32 h-32 rounded-full bg-seal-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <span className="text-6xl text-seal-gold font-display font-bold">福</span>
                    </div>
                    <h3 className="text-3xl font-bold text-seal-gold mb-2 font-display uppercase tracking-widest">Fortune</h3>
                    <p className="text-red-200">Tap to reveal your destiny</p>
                    <Sparkles className="absolute bottom-10 right-10 text-seal-gold/40 w-12 h-12 animate-pulse" />
                    <Sparkles className="absolute top-10 left-10 text-seal-gold/40 w-8 h-8 animate-pulse delay-75" />
                </div>


                {/* Back of Card (The Content - White/Cream style) */}
                <div
                    className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-2xl bg-seal-cream text-seal-dark flex flex-col items-center justify-center p-8 text-center"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    {fortune && (
                        <>
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6 text-2xl">
                                {fortune.type === 'wealth' && '💰'}
                                {fortune.type === 'health' && '🍵'}
                                {fortune.type === 'love' && '❤️'}
                                {fortune.type === 'career' && '🚀'}
                                {fortune.type === 'general' && '✨'}
                            </div>
                            <h4 className="text-sm font-bold text-seal-red uppercase tracking-wider mb-4 opacity-70">
                                {fortune.type}
                            </h4>
                            <p className="text-2xl font-display font-bold text-seal-dark leading-relaxed">
                                "{fortune.message}"
                            </p>

                            <div className="absolute bottom-8 left-0 w-full flex justify-center">
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <RefreshCw className="w-3 h-3" /> Tap to flip back
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
