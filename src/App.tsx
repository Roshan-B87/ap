import { useState, useEffect, ReactNode, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, Flower2, Send, ChevronRight, Sparkles, Stars, Volume2 } from 'lucide-react';

// --- Decorative Components ---

const Petal = ({ delay }: { delay: number, key?: string }) => {
  const randomX = Math.random() * 100;
  const duration = Math.random() * 10 + 10;
  const size = Math.random() * 20 + 10;

  return (
    <motion.div
      initial={{ y: -50, x: `${randomX}vw`, rotate: 0, opacity: 0 }}
      animate={{ 
        y: '110vh', 
        x: [`${randomX}vw`, `${randomX + (Math.random() * 20 - 10)}vw`, `${randomX}vw`],
        rotate: 360,
        opacity: [0, 0.7, 0.7, 0]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay,
        ease: "linear"
      }}
      className="absolute pointer-events-none z-0"
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#fb7185" fillOpacity="0.4" />
      </svg>
    </motion.div>
  );
};

const FloatingDecorations = () => {
  const petals = Array.from({ length: 25 });
  const stars = Array.from({ length: 40 });
  const roses = Array.from({ length: 12 });
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((_, i) => (
        <Petal key={`petal-${i}`} delay={i * 0.8} />
      ))}
      
      {roses.map((_, i) => (
        <motion.div
          key={`rose-${i}`}
          initial={{ 
            opacity: 0, 
            x: `${Math.random() * 100}vw`, 
            y: `${Math.random() * 100}vh`,
            scale: 0.5,
            rotate: Math.random() * 360
          }}
          animate={{ 
            opacity: [0, 0.2, 0],
            scale: [0.5, 0.8, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 15 + Math.random() * 10, 
            repeat: Infinity, 
            delay: Math.random() * 10 
          }}
          className="absolute text-rose-400/20"
        >
          <Flower2 size={Math.random() * 40 + 30} />
        </motion.div>
      ))}

      {stars.map((_, i) => (
        <motion.div
          key={`star-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity, 
            delay: Math.random() * 5 
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%` 
          }}
        />
      ))}
      
      {/* Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-rose-600/15 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-pink-600/15 blur-[150px] rounded-full animate-pulse delay-1000" />
      <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse delay-700" />
    </div>
  );
};


const GlassCard = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 30 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: -30 }}
    transition={{ type: "spring", damping: 25, stiffness: 120 }}
    className={`relative backdrop-blur-3xl bg-white/[0.03] border border-white/20 rounded-[3rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden ${className}`}
  >
    {/* Decorative Corner Flourish */}
    <div className="absolute top-0 right-0 p-4 opacity-20">
      <Sparkles size={40} className="text-rose-300" />
    </div>
    <div className="absolute bottom-0 left-0 p-4 opacity-20">
      <Heart size={40} className="text-rose-300" />
    </div>
    
    {/* Inner Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-rose-500/5 pointer-events-none" />
    <div className="relative z-10 h-full flex flex-col">
      {children}
    </div>
  </motion.div>
);

const Button = ({ onClick, children, variant = "primary", className = "" }: { onClick?: () => void, children: ReactNode, variant?: "primary" | "secondary", className?: string }) => {
  const baseStyles = "relative px-10 py-5 rounded-2xl font-bold transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 cursor-pointer overflow-hidden group tracking-wide";
  const variants = {
    primary: "text-white shadow-[0_15px_30px_rgba(244,63,94,0.4)] hover:shadow-[0_20px_40px_rgba(244,63,94,0.6)]",
    secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-sm"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600 bg-[length:200%_100%] animate-gradient-x group-hover:scale-110 transition-transform duration-700" />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

// --- Pages ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void, key?: string }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050202] text-white p-6 text-center overflow-hidden">
      <div className="relative">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4],
            filter: ["blur(0px)", "blur(4px)", "blur(0px)"]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          <Heart fill="#e11d48" size={140} className="text-rose-600 drop-shadow-[0_0_40px_rgba(225,29,72,0.9)]" />
        </motion.div>
        <div className="absolute inset-0 bg-rose-500/30 blur-[100px] rounded-full animate-pulse" />
        
        {/* Orbiting Sparkles */}
        {[0, 1, 2, 3].map(i => (
          <motion.div
            key={i}
            animate={{ 
              rotate: 360,
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: i * 0.75,
              ease: "linear"
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <Sparkles size={20} className="text-rose-300 absolute -top-4 left-1/2" />
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.2 }}
        className="mt-16 space-y-6"
      >
        <h1 className="text-5xl font-serif italic tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-rose-100 to-rose-400">
          Good Morning, Priyanka
        </h1>
        <p className="text-rose-200/40 tracking-[0.5em] text-xs uppercase">Preparing something special</p>
        <div className="flex justify-center gap-3">
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              animate={{ scale: [1, 2, 1], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
              className="w-1.5 h-1.5 bg-rose-500 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const PageChoice = ({ onNext }: { onNext: () => void, key?: string }) => {
  const [showSpaceMessage, setShowSpaceMessage] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <GlassCard className="max-w-md w-full border-rose-500/20">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-rose-500/10 blur-[100px] rounded-full" />
        <h2 className="text-3xl font-serif italic mb-10 text-white leading-relaxed">
          "I know you need space and I am not disturbing you. Take your time, but I have something for you."
        </h2>
        <div className="flex flex-col gap-5">
          <Button onClick={onNext}>
            Enter My Heart <ChevronRight size={20} />
          </Button>
          <Button variant="secondary" onClick={() => setShowSpaceMessage(true)}>
            I need more space
          </Button>
        </div>
        
        <AnimatePresence>
          {showSpaceMessage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-10 p-6 rounded-[2rem] bg-rose-500/5 border border-rose-500/10 backdrop-blur-sm"
            >
              <p className="text-rose-200 italic text-sm leading-relaxed">
                I understand, Priyanka. My love for you is patient and kind. I'll be right here whenever you're ready to talk.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </div>
  );
};

const PagePassword = ({ onNext }: { onNext: () => void, key?: string }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const correctPassword = "19-03-2026";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      onNext();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <GlassCard className="max-w-md w-full border-pink-500/20">
        <div className="relative mb-10">
          <div className="bg-gradient-to-br from-rose-500/40 to-pink-600/40 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/20 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
            <Lock className="text-rose-100" size={40} />
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-rose-500/20 rounded-full scale-150"
          />
        </div>
        
        <h2 className="text-4xl font-serif italic mb-3 text-white">Unlock My Love</h2>
        <p className="text-rose-200/50 text-sm mb-10 flex items-center justify-center gap-3">
          <Sparkles size={16} className="text-rose-400" /> 
          Hint: "Our love night" 
          <Sparkles size={16} className="text-rose-400" />
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="DD-MM-YYYY"
              className={`w-full bg-black/40 border-2 ${error ? 'border-rose-500 animate-shake' : 'border-white/10'} rounded-3xl px-8 py-5 text-white text-center text-2xl tracking-[0.3em] font-serif placeholder:text-white/10 focus:outline-none focus:border-rose-500/50 transition-all shadow-2xl group-hover:border-white/20`}
            />
          </div>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-rose-400 text-sm font-semibold tracking-wide"
            >
              Incorrect password, baby. Try again.
            </motion.p>
          )}
          <Button className="w-full py-6">
            Unlock My Heart <ChevronRight size={20} />
          </Button>
        </form>
      </GlassCard>
    </div>
  );
};

const PageApology = ({ onNext }: { onNext: () => void, key?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <GlassCard className="max-w-md w-full border-rose-500/20">
        <div className="mb-12 flex justify-center relative">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 80, delay: 0.3 }}
            className="relative z-10"
          >
            <Flower2 size={120} className="text-rose-400 drop-shadow-[0_0_30px_rgba(251,113,133,0.6)]" />
          </motion.div>
          <div className="absolute inset-0 bg-rose-500/20 blur-[80px] rounded-full scale-150 animate-pulse" />
        </div>
        <h2 className="text-2xl font-serif italic mb-12 text-white/90 leading-relaxed px-4">
          "I know kal hamari second night thi and meri thodi stupid bato ne kharab kar diya but being your roshuu it is my responsibility to make you happy and also show my actual love for you."
        </h2>
        <Button onClick={onNext} className="w-full py-6">
          Continue Journey <ChevronRight size={20} />
        </Button>
      </GlassCard>
    </div>
  );
};

const PageTransition = ({ onNext }: { onNext: () => void, key?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <GlassCard className="max-w-md w-full border-yellow-500/20">
        <div className="relative mb-10">
          <Sparkles className="text-yellow-400 mx-auto animate-bounce" size={60} />
          <div className="absolute inset-0 bg-yellow-400/20 blur-[60px] rounded-full" />
        </div>
        <h2 className="text-3xl font-serif italic mb-12 text-white leading-relaxed">
          "Tumne toh apna letter de diya ab bari hamari hai meri jaan."
        </h2>
        <Button onClick={onNext} className="w-full py-6">
          Read My Letter <ChevronRight size={20} />
        </Button>
      </GlassCard>
    </div>
  );
};

const PageLetter = ({ onComplete }: { onComplete: () => void, key?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <GlassCard className="max-w-md w-full h-[85vh] flex flex-col border-rose-500/40">
        {/* Decorative corner roses */}
        <div className="absolute top-0 left-0 p-4 opacity-10 -translate-x-4 -translate-y-4 rotate-[-45deg]">
          <Flower2 size={80} className="text-rose-400" />
        </div>
        <div className="absolute bottom-0 right-0 p-4 opacity-10 translate-x-4 translate-y-4 rotate-[135deg]">
          <Flower2 size={80} className="text-rose-400" />
        </div>

        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
          <div className="flex items-center gap-4 mb-10 sticky top-0 bg-[#0a0505] py-6 z-20 border-b border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500/30 to-pink-600/30 flex items-center justify-center shadow-lg">
              <Heart size={24} className="text-rose-300" fill="currentColor" />
            </div>
            <div>
              <h2 className="text-2xl font-serif italic text-rose-100">My Dearest Priyanka...</h2>
              <p className="text-rose-400/60 text-[10px] uppercase tracking-[0.3em]">From Roshuu with love</p>
            </div>
          </div>
          
          <div className="space-y-10 text-white/80 leading-relaxed font-light text-xl pb-12">
            <p className="text-rose-200 font-serif italic text-2xl">My baby, my jaan,</p>
            <p>
              I'm writing this because words sometimes fail me when I'm looking into your eyes, or even when I'm just thinking about you. 
              I know last night didn't go as planned. It was our second night, a night that should have been filled with only joy and closeness, 
              but my stupid words and idiotic mistakes clouded that beautiful moment.
            </p>
            <p>
              I am so sorry for being such an idiot boyfriend. Sometimes I don't realize how my words might affect you, but please know that 
              my heart belongs only to you. You are the most precious person in my life, and seeing you upset is the last thing I ever want.
            </p>
            <div className="py-6 flex justify-center items-center gap-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-rose-500/30" />
              <Heart size={16} className="text-rose-500/50" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-rose-500/30" />
            </div>
            <p>
              Being your "Roshuu" is the greatest privilege I have, and I promise to take that responsibility seriously. I want to make you 
              the happiest girl in the world. I want to show you my actual love, the kind that stays through the stupid fights and the 
              misunderstandings.
            </p>
            <p>
              Take all the time you need, Priyanka. I understand you need space. But please, never leave. My world is so much brighter with you in it. 
              I am here, waiting, always.
            </p>
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-rose-500/10 to-pink-600/10 border border-rose-500/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <Sparkles size={40} />
              </div>
              <p className="font-medium text-rose-100 italic relative z-10">
                Agar aap maan gayi ho toh apne is thode se idiot boyfriend ko ek pic bhejna naha kar, intezaar rahega. 
                If you don't want to send a pic, just tell me "I love you mine love" on Telegram.
              </p>
            </div>
            <div className="text-right pt-10">
              <p className="text-rose-300 font-serif italic text-2xl">Yours forever,</p>
              <p className="text-4xl font-serif italic text-white mt-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Roshuu ❤️</p>
            </div>
          </div>
        </div>
        <Button onClick={onComplete} className="mt-10 w-full shadow-rose-600/50 py-6">
          Send My Love <Send size={20} />
        </Button>
      </GlassCard>
    </div>
  );
};

const FinalPopup = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#050202]/90 backdrop-blur-xl"
    >
      <GlassCard className="max-w-sm text-center border-rose-500/60 relative overflow-visible">
        {/* Floating roses around the card */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`popup-rose-${i}`}
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4 + i, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.5
            }}
            className="absolute z-[-1] text-rose-500/30"
            style={{
              top: i < 2 ? '-20%' : '80%',
              left: i % 2 === 0 ? '-20%' : '80%',
            }}
          >
            <Flower2 size={60 + i * 10} />
          </motion.div>
        ))}

        <motion.div 
          initial={{ y: -50, opacity: 0, rotate: -20 }}
          animate={{ y: -100, opacity: 1, rotate: 12 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-28 bg-gradient-to-br from-rose-600 to-pink-700 rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_40px_rgba(225,29,72,0.5)] border border-white/20"
        >
          <Heart fill="white" className="text-white" size={56} />
        </motion.div>
        
        <div className="pt-16">
          <h2 className="text-4xl font-serif italic text-white mb-4">I Love You!</h2>
          <p className="text-rose-100/90 mb-12 leading-relaxed text-lg">
            "Thanks for choosing me as your boyfriend. I try to be the best and the most trustful partner. Waiting..."
          </p>
          <Button onClick={() => window.location.reload()} className="w-full py-6">
            Forever Yours
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(prev => prev + 1);

  return (
    <div className="min-h-screen bg-[#050202] text-white font-sans selection:bg-rose-500/40 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-rose-950 via-[#050202] to-pink-950 opacity-60 z-[-1]" />
      <FloatingDecorations />
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {step === 0 && <LoadingScreen key="loading" onComplete={nextStep} />}
          {step === 1 && <PageChoice key="choice" onNext={nextStep} />}
          {step === 2 && <PagePassword key="password" onNext={nextStep} />}
          {step === 3 && <PageApology key="apology" onNext={nextStep} />}
          {step === 4 && <PageTransition key="transition" onNext={nextStep} />}
          {step === 5 && <PageLetter key="letter" onComplete={nextStep} />}
        </AnimatePresence>

        {step === 6 && <FinalPopup key="final" />}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@200;300;400;600&display=swap');

        body {
          font-family: 'Inter', sans-serif;
          cursor: default;
        }

        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(244, 63, 94, 0.25);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(244, 63, 94, 0.45);
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
        
        ::selection {
          background: rgba(225, 29, 72, 0.3);
          color: white;
        }
      `}</style>
    </div>
  );
}
