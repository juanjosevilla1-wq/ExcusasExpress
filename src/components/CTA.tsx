import { Zap, CreditCard, ShieldCheck } from 'lucide-react';

export default function CTA({ className = "", onOpenFlow }: { className?: string; onOpenFlow?: () => void }) {
  return (
    <div className={`bento-card ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Zap size={22} className="text-excuse-yellow" />
        <h3 className="font-extrabold text-xl text-slate-900 dark:text-slate-100 leading-none mt-1">
          ¿Problemas ahora?
        </h3>
      </div>
      <p className="text-[15px] text-slate-500 dark:text-slate-400 mt-2 font-medium leading-relaxed">
        Desbloquea el chat de emergencia y consigue una excusa profesional en menos de 1 minuto.
      </p>
      
      <div className="mt-auto space-y-4 pt-6">
        <button 
          onClick={onOpenFlow}
          className="w-full bg-electric-blue hover:bg-electric-blue-dark text-white font-extrabold text-lg py-4 rounded-2xl sm:rounded-[1.5rem] shadow-xl shadow-electric-blue/20 dark:shadow-none transition-all active:scale-95"
        >
          ¡Sacáme de Aquí!
        </button>
        <div className="flex items-center justify-center gap-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
          <span className="flex items-center gap-1.5"><CreditCard size={14} /> Bizum</span>
          <div className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
          <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> Seguro</span>
        </div>
      </div>
    </div>
  );
}


