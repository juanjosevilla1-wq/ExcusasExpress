import { motion } from 'motion/react';
import { Bot, Zap, MessageCircle } from 'lucide-react';

export default function Hero({ className = "", onOpenFlow }: { className?: string; onOpenFlow?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bento-card bg-electric-blue text-white relative overflow-hidden flex flex-col justify-center text-left ${className}`}
    >
      <div className="z-10 h-full flex flex-col items-start justify-center p-2 sm:p-4">
        <span className="bg-yellow-400 text-blue-900 text-[10px] sm:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 mb-6 shadow-sm">
          <Zap size={14} className="animate-pulse" /> 24/7 Disponible
        </span>
        
        <h1 className="text-5xl sm:text-5xl lg:text-7xl font-black mt-2 leading-[0.95] tracking-tight">
          Líbrate de <br /> cualquier <br className="sm:hidden" />
          <span className="text-yellow-400">marrón</span>.
        </h1>
        
        <p className="text-blue-100/90 text-sm sm:text-xl mt-6 font-medium max-w-md leading-relaxed">
          Usa nuestra IA experta en escapismo social. Obtén la excusa irrefutable en 1 minuto.
        </p>
        
        <button 
          onClick={onOpenFlow}
          className="mt-8 sm:mt-auto bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-black text-lg py-4 px-8 rounded-full sm:rounded-2xl w-full sm:w-fit transition-all flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(250,204,21,0.3)] active:scale-95"
        >
          <MessageCircle size={22} className="fill-blue-900" />
          Empezar chat
        </button>
      </div>

      <div className="absolute -right-8 -bottom-8 sm:-right-12 sm:-bottom-12 opacity-10 pointer-events-none">
        <Bot size={220} className="sm:w-[300px] sm:h-[300px]" />
      </div>
    </motion.div>
  );
}



