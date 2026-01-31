import clsx from 'clsx';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

export function Layout({ children, className }: LayoutProps) {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-seal-dark text-seal-cream font-sans selection:bg-seal-red selection:text-white">
            {/* Background Pattern - subtle grandeur */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--color-seal-red)_0%,_transparent_50%)] blur-[100px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            </div>

            {/* Header */}
            <header className="relative z-10 w-full p-6 flex justify-between items-center bg-gradient-to-b from-seal-dark/80 to-transparent backdrop-blur-[2px]">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-seal-red rounded-full flex items-center justify-center border border-seal-gold shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                        <span className="text-seal-gold font-bold text-xs">SL</span>
                    </div>
                    <h1 className="text-xl font-display font-bold tracking-wide text-seal-gold">
                        Seal Labs <span className="text-seal-cream/80 font-light">Lunar New Year</span>
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className={clsx("relative z-10 container mx-auto px-4 py-8 max-w-md md:max-w-2xl", className)}>
                {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 w-full py-8 text-center text-seal-cream/40 text-sm">
                <p>© 2026 Seal Labs. Chuc Mung Nam Moi!</p>
            </footer>
        </div>
    );
}
