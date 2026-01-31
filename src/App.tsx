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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 mb-4"
          >
            <h2 className="type-h1 text-seal-ivory">
              Xuân 2026
            </h2>
            <p className="type-body text-seal-ivory/70 font-light tracking-wide">Pick your luck for the Year of the Horse.</p>
          </motion.div>

          <div className="grid gap-4 w-[92vw] max-w-[520px]">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView('fortune')}
              className="group relative overflow-hidden p-6 rounded-2xl bg-seal-ivory text-seal-dark shadow-xl flex items-center justify-between transition-all cursor-pointer text-left"
            >
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="type-h2 flex items-center gap-2 tracking-tight">
                    <Dices className="text-seal-red w-5 h-5" /> Gieo Quẻ
                  </span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-seal-dark/5 text-seal-dark/50 text-[10px] uppercase font-bold tracking-[0.15em] border border-seal-dark/10">
                    Unlimited
                  </span>
                </div>
                <span className="type-caption text-seal-dark/70 font-medium">Fortune Draw</span>
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
                    <MailOpen className="w-5 h-5" /> Lì Xì
                  </span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-seal-ivory/5 group-hover:bg-seal-dark/5 text-seal-ivory/50 group-hover:text-seal-dark/50 text-[10px] uppercase font-bold tracking-[0.15em] border border-seal-ivory/10 group-hover:border-seal-dark/10 transition-colors">
                    One claim
                  </span>
                </div>
                <span className="type-caption opacity-70 group-hover:opacity-100 group-hover:text-seal-dark/70 font-medium transition-opacity">Lucky Money</span>
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
