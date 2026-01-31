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
        <div className="flex flex-col gap-8 items-center justify-center min-h-[60vh]">
          <div className="text-center mb-12">
            <h1 className="type-h1 text-seal-ivory mb-3">Lunar New Year 2026</h1>
            <p className="type-body text-seal-ivory/70 font-light tracking-wide">Pick your luck for the Year of the Horse</p>
          </div>

          <div className="grid gap-4 w-[92vw] max-w-[560px]">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView('fortune')}
              className="group relative overflow-hidden p-6 rounded-2xl bg-seal-ivory text-seal-dark shadow-xl flex items-center justify-between transition-all cursor-pointer text-left"
            >
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="type-h2 flex items-center gap-2 tracking-tight">
                    <Dices className="text-seal-red w-5 h-5" /> Fortune Draw
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-seal-dark/5 text-seal-dark/40 text-[9px] uppercase font-bold tracking-[0.2em] border border-seal-dark/10">
                    Unlimited
                  </span>
                </div>
                <span className="type-caption text-seal-dark/60 font-medium tracking-wide">Gieo Quẻ</span>
              </div>
              <Sparkles className="w-5 h-5 text-seal-red/40 group-hover:text-seal-red transition-colors" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView('lucky')}
              className="group relative overflow-hidden p-6 rounded-2xl bg-white/5 border border-seal-ivory/20 text-seal-ivory shadow-lg flex items-center justify-between transition-all hover:bg-seal-ivory hover:text-seal-dark cursor-pointer text-left"
            >
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="type-h2 flex items-center gap-2 tracking-tight">
                    <MailOpen className="w-5 h-5" /> Lucky Money
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-seal-ivory/5 group-hover:bg-seal-dark/5 text-seal-ivory/40 group-hover:text-seal-dark/40 text-[9px] uppercase font-bold tracking-[0.2em] border border-seal-ivory/10 group-hover:border-seal-dark/10 transition-colors">
                    One Claim
                  </span>
                </div>
                <span className="type-caption opacity-60 group-hover:opacity-100 group-hover:text-seal-dark/60 font-medium tracking-wide transition-opacity">Lì Xì</span>
              </div>
              <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="font-bold text-sm">$</span>
              </div>
            </motion.button>
          </div>
        </div>
      )}

      {view === 'fortune' && (
        <div className="flex flex-col items-center">
          <button
            onClick={() => setView('landing')}
            className="self-start mb-6 text-sm text-seal-ivory/50 hover:text-seal-ivory flex items-center gap-1 transition-colors group"
          >
            ← <span className="font-medium group-hover:underline decoration-seal-red underline-offset-4">Back to Home</span>
          </button>

          <div className="w-full">
            <FortuneCard
              onDraw={() => {
                const random = Math.floor(Math.random() * FORTUNES.length);
                return FORTUNES[random];
              }}
            />
          </div>

          <p className="mt-8 text-seal-ivory/40 text-sm max-w-xs text-center caption-bottom">
            “Every draw is a new possibility. May the odds be ever in your favor.”
          </p>
        </div>
      )}

      {view === 'lucky' && (
        <div className="flex flex-col items-center w-full">
          <button
            onClick={() => setView('landing')}
            className="self-start mb-6 text-sm text-seal-ivory/50 hover:text-seal-ivory flex items-center gap-1 transition-colors group"
          >
            ← <span className="font-medium group-hover:underline decoration-seal-red underline-offset-4">Back to Home</span>
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
