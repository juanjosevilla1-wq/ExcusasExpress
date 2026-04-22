import { Home, Sparkles, MessageCircle, Wallet } from 'lucide-react';

export default function BottomNav({ onOpenFlow }: { onOpenFlow: () => void }) {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 pb-safe pb-4 pt-2 px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between">
        <a href="#" className="flex flex-col items-center gap-1 text-slate-400 hover:text-electric-blue transition-colors px-2">
          <Home size={20} />
          <span className="text-[10px] font-bold">Inicio</span>
        </a>
        <a href="#ejemplos" className="flex flex-col items-center gap-1 text-slate-400 hover:text-electric-blue transition-colors px-2">
          <Sparkles size={20} />
          <span className="text-[10px] font-bold">Ejemplos</span>
        </a>
        
        {/* Main Action Button in Center */}
        <div className="relative -top-6 px-2">
          <button 
            onClick={onOpenFlow}
            className="w-16 h-16 bg-electric-blue text-white rounded-full flex flex-col items-center justify-center shadow-xl shadow-electric-blue/40 border-4 border-white dark:border-slate-950 transform active:scale-95 transition-all text-center"
          >
            <MessageCircle size={24} className="mb-0.5" />
            <span className="text-[9px] font-black uppercase tracking-tighter leading-none opacity-90">Chat</span>
          </button>
        </div>

        <a href="#servicios" className="flex flex-col items-center gap-1 text-slate-400 hover:text-electric-blue transition-colors px-2">
          <Wallet size={20} />
          <span className="text-[10px] font-bold">Tarifas</span>
        </a>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-electric-blue transition-colors px-2">
          <div className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center border border-slate-400 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=11" alt="Perfil" className="opacity-50" />
          </div>
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
      </div>
    </div>
  );
}
