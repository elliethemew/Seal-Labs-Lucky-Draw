import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Coins, Activity, Heart, Briefcase, Star } from 'lucide-react';
import type { Fortune } from '../data/fortunes';
import { SealIcon } from './SealIcon';
import { FortuneSticksIcon } from './icons/FortuneSticks';

interface FortuneCardProps {
    onDraw: () => Fortune;
}

export function FortuneCard({ onDraw }: FortuneCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [fortune, setFortune] = useState<Fortune | null>(null);

    const handleInteraction = () => {
        if (isAnimating) return;

        setIsAnimating(true);

        if (isFlipped) {
            // Reset
            setIsFlipped(false);
            // Wait for half animation to clear data (so it doesn't pop)
            setTimeout(() => setFortune(null), 300);
            setTimeout(() => setIsAnimating(false), 720);
        } else {
            // Draw
            const newFortune = onDraw();
            setFortune(newFortune);
            setIsFlipped(true);
            setTimeout(() => setIsAnimating(false), 720);
        }
    };

    return (
        <div className="flex flex-col items-center gap-5">
            {/* 3D Stage */}
            <div className="perspective-1200 w-[340px] h-[500px] group">
                {/* Flippable Card Container */}
                <div
                    className={`
                        w-full h-full relative preserve-3d cursor-pointer 
                        active:scale-[0.98]
                        ${isFlipped ? 'animate-flip-back' : (isAnimating ? 'animate-flip-front' : 'transition-transform duration-500 ease-spring')}
                    `}
                    onClick={handleInteraction}
                >
                    {/* Consistent Shadow (Behind everything) */}
                    <div className={`absolute inset-4 rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-opacity duration-700 ${isFlipped ? 'opacity-70' : 'opacity-50'}`} />

                    {/* --- FRONT FACE --- */}
                    <div className="absolute inset-0 backface-hidden rounded-[24px] overflow-hidden bg-gradient-to-br from-[#A01D20] to-[#500A0B] flex flex-col items-center justify-center p-8 text-center border border-white/5 ring-1 ring-white/5 z-20">
                        {/* 1. Specular Sheen */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        {/* 2. Borders */}
                        <div className="absolute inset-[3px] rounded-[20px] border border-seal-gold/10 opacity-50 pointer-events-none" />

                        {/* 3. Center Seal */}
                        <div className="mb-12 relative z-10 transform transition-transform duration-500 group-hover:scale-105">
                            <SealIcon size={140} variant="embossed">
                                <FortuneSticksIcon className="w-[84px] h-[84px] text-seal-gold filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                            </SealIcon>
                        </div>

                        <h3 className="text-xl font-bold text-seal-gold mb-2 font-display uppercase tracking-[0.25em] drop-shadow-sm">Fortune</h3>
                    </div>

                    {/* --- BACK FACE (Initially Rotated) --- */}
                    <div
                        className="absolute inset-0 backface-hidden rounded-[24px] overflow-hidden text-seal-dark flex flex-col items-center justify-center p-8 text-center rotate-y-180 z-20"
                        style={{
                            background: 'linear-gradient(180deg, #F5E6CF 0%, #EFD9B8 100%)', // Warm Ivory / Paper
                            border: '1px solid rgba(255, 255, 255, 0.4)', // Outer Highlight
                            boxShadow: `
                                0 24px 60px rgba(0,0,0,0.4),
                                inset 0 0 0 1px rgba(94, 18, 19, 0.06), // Warm inner stroke
                                inset 0 2px 4px rgba(0,0,0,0.02)  // Faint inner shadow ("Pressed")
                            `
                        }}
                    >
                        {/* Micro-grain Noise Overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-[0.05]"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            }}
                        />

                        {/* Border Ring */}
                        <div className="absolute inset-[3px] rounded-[20px] border border-seal-gold/10 pointer-events-none" />

                        {fortune && (
                            <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-500 delay-200 fill-mode-forwards">
                                <div className="w-20 h-20 rounded-full bg-seal-dark flex items-center justify-center mb-8 shadow-inner ring-4 ring-seal-gold/10">
                                    {fortune.type === 'wealth' && <Coins className="w-10 h-10 text-seal-gold" strokeWidth={1.5} />}
                                    {fortune.type === 'health' && <Activity className="w-10 h-10 text-seal-gold" strokeWidth={1.5} />}
                                    {fortune.type === 'love' && <Heart className="w-10 h-10 text-seal-gold" strokeWidth={1.5} />}
                                    {fortune.type === 'career' && <Briefcase className="w-10 h-10 text-seal-gold" strokeWidth={1.5} />}
                                    {fortune.type === 'general' && <Star className="w-10 h-10 text-seal-gold" strokeWidth={1.5} />}
                                </div>

                                <h4 className="type-caption font-bold text-[#8C181B] uppercase tracking-widest mb-4 text-xs opacity-80">
                                    {fortune.type}
                                </h4>

                                <p className="text-2xl font-bold text-seal-dark leading-relaxed tracking-tight px-2 font-display">
                                    “{fortune.message}”
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* External Caption */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="type-caption text-[#E5C698] uppercase tracking-[0.15em] text-[11px] font-semibold flex items-center gap-2 mt-4 opacity-90"
            >
                {isFlipped ? (
                    <>
                        <RefreshCw className="w-3 h-3" /> Tap to flip back
                    </>
                ) : (
                    "Tap to reveal your fortune"
                )}
            </motion.p>
        </div>
    );
}
