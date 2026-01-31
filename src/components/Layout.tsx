import clsx from 'clsx';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

export function Layout({ children, className }: LayoutProps) {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-seal-dark text-seal-ivory font-sans selection:bg-seal-red selection:text-white">
            {/* Material Realism Background Stack */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[#240607]">
                {/* 1. Base Layer: Deep Lacquer Gradient (Radial lift) */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at center, #5B1414 0%, #4A0E0E 40%, #2A0707 100%)'
                    }}
                />

                {/* 2. Company Pattern: Blurred & Subtle */}
                <div
                    className="absolute inset-0 opacity-[0.04] mix-blend-overlay blur-[8px]"
                    style={{
                        backgroundImage: `url("${import.meta.env.BASE_URL}logo.png")`,
                        backgroundSize: '120px',
                        backgroundRepeat: 'repeat',
                        transform: 'scale(1.2)'
                    }}
                />

                {/* 3. Gold Dust Bloom: Warm ambient light (Top Left) */}
                <div
                    className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-[0.06] mix-blend-screen pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, #C9A35C 0%, transparent 70%)',
                        filter: 'blur(160px)'
                    }}
                />

                {/* 4. Vignette: Focus Control */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.3) 100%)'
                    }}
                />

                {/* 5. Film Grain: Global Texture */}
                <div
                    className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <header className="relative z-10 w-full px-8 py-8 md:px-10 flex justify-between items-center max-w-7xl mx-auto opacity-90">
                <div className="flex items-center">
                    {/* Logo - Clickable Home Link */}
                    <a href={import.meta.env.BASE_URL} className="flex items-center hover:opacity-80 transition-opacity cursor-pointer">
                        <img
                            src={`${import.meta.env.BASE_URL}logo.png`}
                            alt="Seal Labs"
                            className="h-6 w-auto object-contain transition-all duration-300"
                            style={{
                                filter: 'brightness(0) saturate(100%) invert(84%) sepia(26%) saturate(608%) hue-rotate(322deg) brightness(98%) contrast(90%)'
                            }}
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.nextElementSibling!.classList.remove('hidden');
                            }}
                        />
                        <span className="logo-fallback hidden font-bold text-sm tracking-widest text-seal-ivory ml-2">SEAL LABS</span>
                    </a>

                    <div className="h-3 w-px bg-seal-ivory/20 mx-4" />

                    <span className="text-[10px] uppercase tracking-[0.25em] text-seal-ivory/70 font-medium pt-0.5">
                        LUNAR NEW YEAR
                    </span>
                </div>
            </header>

            {/* Main Content */}
            <main className={clsx("relative z-10 container mx-auto px-4 py-8 max-w-md md:max-w-2xl", className)}>
                {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 w-full p-6 text-center opacity-20 hover:opacity-40 transition-opacity">
                <p className="type-caption text-[10px] tracking-[0.2em] text-seal-ivory uppercase">© 2026 Seal Labs</p>
            </footer>
        </div>
    );
}
