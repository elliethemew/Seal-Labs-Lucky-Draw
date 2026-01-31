import clsx from 'clsx';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

export function Layout({ children, className }: LayoutProps) {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-seal-dark text-seal-ivory font-sans selection:bg-seal-red selection:text-white">
            {/* Background Pattern - subtle grandeur */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--color-seal-red)_0%,_transparent_50%)] blur-[100px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            </div>

            <header className="relative z-10 w-full px-8 py-8 md:px-10 flex justify-between items-center max-w-7xl mx-auto opacity-90">
                <div className="flex items-center">
                    {/* Logo - Premium Tiny Size (24px) + Ivory Tint */}
                    <img
                        src="/logo.png"
                        alt="Seal Labs"
                        className="h-6 w-auto object-contain transition-all duration-300 group-hover:brightness-100"
                        style={{
                            filter: 'brightness(0) saturate(100%) invert(84%) sepia(26%) saturate(608%) hue-rotate(322deg) brightness(98%) contrast(90%)' // Forces Ivory #E5C698
                        }}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.querySelector('.logo-fallback')!.classList.remove('hidden');
                        }}
                    />
                    <span className="logo-fallback hidden font-bold text-sm tracking-widest text-seal-ivory">SEAL LABS</span>

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
            <footer className="relative z-10 w-full p-6 text-center opacity-40">
                <p className="type-caption text-xs tracking-widest text-seal-ivory">© 2026 Seal Labs. Happy Lunar New Year!</p>
            </footer>
        </div>
    );
}
