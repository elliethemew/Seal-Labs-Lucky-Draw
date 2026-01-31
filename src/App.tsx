import { useState } from 'react';
import { Layout } from './components/Layout';
import { Sparkles, MailOpen, Dices } from 'lucide-react';
import { motion } from 'framer-motion';
import { FortuneCard } from './components/FortuneCard';
import { LuckyMoney } from './components/LuckyMoney';
import { FORTUNES } from './data/fortunes';

function App() {
  const [view, setView] = useState<'landing' | 'fortune' | 'lucky'>('landing');

  return (
    <Layout>
      {view === 'landing' && (
        <div className="flex flex-col gap-6 items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2 mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-seal-gold to-yellow-200">
              Xuân 2026
            </h2>
            <p className="text-seal-cream/70 text-lg">Pick your luck for the year of the Horse!</p>
          </motion.div>

          <div className="grid gap-4 w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView('fortune')}
              className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-seal-red to-red-900 border border-red-500/30 shadow-[0_4px_20px_rgba(217,56,30,0.3)] flex items-center justify-between transition-all hover:shadow-[0_8px_30px_rgba(217,56,30,0.5)] cursor-pointer"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-2xl font-bold text-white flex items-center gap-2">
                  <Dices className="text-seal-gold" /> Gieo Quẻ
                </span>
                <span className="text-red-200 text-sm">Unlimited Fortune Draw</span>
              </div>
              <Sparkles className="w-8 h-8 text-seal-gold opacity-50 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView('lucky')}
              className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-[#1F1F1F] to-seal-dark border border-seal-gold/30 shadow-[0_4px_20px_rgba(255,215,0,0.1)] flex items-center justify-between transition-all hover:border-seal-gold/60 cursor-pointer"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-2xl font-bold text-seal-gold flex items-center gap-2">
                  <MailOpen className="text-white" /> Lì Xì
                </span>
                <span className="text-gray-400 text-sm">Lucky Money Claim</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-seal-gold/10 flex items-center justify-center group-hover:bg-seal-gold/20 transition-colors">
                <span className="text-seal-gold font-bold">$</span>
              </div>
            </motion.button>
          </div>
        </div>
      )}

      {view === 'fortune' && (
        <div className="flex flex-col items-center">
          <button
            onClick={() => setView('landing')}
            className="self-start mb-6 text-sm text-seal-cream/50 hover:text-seal-gold flex items-center gap-1 transition-colors"
          >
            ← Back to Home
          </button>

          <div className="w-full">
            <FortuneCard
              onDraw={() => {
                const random = Math.floor(Math.random() * FORTUNES.length);
                return FORTUNES[random];
              }}
            />
          </div>

          <p className="mt-8 text-seal-cream/40 text-sm max-w-xs text-center">
            “Every draw is a new possibility. May the odds be ever in your favor.”
          </p>
        </div>
      )}

      {view === 'lucky' && (
        <div className="flex flex-col items-center w-full">
          <button
            onClick={() => setView('landing')}
            className="self-start mb-6 text-sm text-seal-cream/50 hover:text-seal-gold flex items-center gap-1 transition-colors"
          >
            ← Back to Home
          </button>

          <div className="w-full">
            <LuckyMoney />
          </div>
        </div>
      )}

    </Layout>
  );
}

export default App;
