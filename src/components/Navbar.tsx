import ThemeToggle from './ThemeToggle';
import { Bot } from 'lucide-react';

export default function Navbar({ onOpenFlow }: { onOpenFlow: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-electric-blue rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-electric-blue/30">
            <Bot size={20} className="sm:w-7 sm:h-7" />
          </div>
          <span className="font-black text-lg sm:text-2xl tracking-tight text-slate-800 dark:text-white">
            Excusas<span className="text-electric-blue">Express</span>
          </span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-6">
          <ThemeToggle />
          <button 
            onClick={onOpenFlow}
            className="hidden sm:flex bg-electric-blue text-white px-6 py-3 rounded-full text-sm font-extrabold hover:bg-electric-blue-dark transition-all transform active:scale-95 shadow-xl shadow-electric-blue/20"
          >
            Sálvame la vida
          </button>
        </div>
      </div>
    </nav>
  );
}


