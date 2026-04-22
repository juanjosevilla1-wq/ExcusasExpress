import { CheckCircle2, Send } from 'lucide-react';

export default function HowItWorks({ className = "" }: { className?: string }) {
  return (
    <div className={`bento-card border-none bg-blue-50/50 dark:bg-slate-900 shadow-inner overflow-hidden relative ${className}`}>
      <h3 className="text-blue-600 dark:text-blue-400 font-extrabold text-sm uppercase tracking-wider mb-6 relative z-10 flex items-center gap-2">
        <span>Cómo te salvamos en 3 pasos:</span>
      </h3>
      
      <div className="space-y-4 relative z-10">
        
        {/* Step 1 */}
        <div className="flex flex-col gap-1 items-end">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">1. El Problema</span>
          </div>
          <div className="bg-electric-blue text-white p-3 px-4 rounded-2xl rounded-tr-sm text-sm font-medium shadow-md shadow-blue-500/20 max-w-[90%]">
            Tengo comida con mis suegros y cero ganas. ¿Qué digo?
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col gap-1 items-start mt-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">2. Compras el Pase (0,25€)</span>
          </div>
          <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-3 px-4 rounded-2xl rounded-tl-sm text-sm font-medium border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
             <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 text-green-600 rounded-full flex justify-center items-center">
               <CheckCircle2 size={16} />
             </div>
             <div>
               <div className="font-bold">Pago verificado</div>
               <div className="text-[10px] opacity-70">ExcusasExpress activado</div>
             </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col gap-1 items-start mt-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">3. Tu Defensa Perfecta</span>
          </div>
          <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-3 px-4 rounded-2xl rounded-tl-sm text-sm font-medium border border-slate-200 dark:border-slate-700 shadow-sm max-w-[95%]">
             "Lo siento muchísimo. Se acaba de romper una tubería en el baño del vecino de arriba y me está cayendo agua. Estoy aquí con fregonas y cubos..."
          </div>
          <button className="mt-2 text-xs font-bold text-electric-blue flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-blue-100 dark:border-slate-700 shadow-sm self-start">
             <Send size={12} /> Copiar y Enviar a Suegros
          </button>
        </div>

      </div>
      
      {/* Decorative bubbles in background */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200/40 dark:bg-blue-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-yellow-200/40 dark:bg-yellow-900/10 rounded-full blur-2xl" />
    </div>
  );
}




