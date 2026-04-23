import { Check } from 'lucide-react';
import { motion } from 'motion/react';

const plans = [
  {
    name: "Excusa Básica",
    price: "0,25€",
    originalPrice: "0,50€",
    value: 0.25,
    desc: "Un mensaje directo y efectivo.",
    features: ["Texto corto", "1 Situación estándar", "Entrega instantánea"],
    button: "Me sirve",
    popular: false
  },
  {
    name: "Excusa Premium",
    price: "1,50€",
    originalPrice: "3,00€",
    value: 1.50,
    desc: "Añadimos contexto y detalles.",
    features: ["Contexto personalizado", "3 Variantes distintas", "Soporte de seguimiento"],
    button: "Quiero esta",
    popular: true
  },
  {
    name: "Nota de Voz Actuada",
    price: "2,00€",
    originalPrice: "4,00€",
    value: 2.00,
    desc: "Audio grabado por actores expertos.",
    features: ["Voz jadeando/ruido de fondo", "Guion profesional", "Efecto 'estoy en líos'"],
    button: "Hágase el drama",
    popular: false
  },
  {
    name: "Nivel Dios",
    price: "6,00€",
    originalPrice: "12,00€",
    value: 6.00,
    desc: "Historia completa + seguimiento.",
    features: ["Documentación falsa (fotos)", "Trama multidía", "Plan de escape total"],
    button: "Sálvame la vida",
    popular: false
  }
];

export default function Services({ className = "", onOpenFlow }: { className?: string; onOpenFlow?: (name: string, price: number) => void }) {
  return (
    <div className={`bento-card ${className}`}>
      <h3 className="text-blue-600 dark:text-blue-400 font-extrabold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        Planes de Escape
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
        {plans.map((plan, idx) => (
          <div 
            key={idx} 
            onClick={() => onOpenFlow?.(plan.name, plan.value)}
            role="button"
            className={`p-5 rounded-[1.5rem] border-2 transition-all cursor-pointer flex flex-col justify-between active:scale-[0.98] relative overflow-hidden ${
              plan.popular 
                ? 'border-electric-blue bg-blue-50/50 dark:bg-electric-blue-dark/20 hover:bg-blue-50 dark:hover:bg-electric-blue-dark/30 hover:border-electric-blue text-slate-800' 
                : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-bl-lg">
              -50%
            </div>
            <div>
              <div className="flex justify-between items-start mb-2 mt-1">
                <span className={`font-extrabold text-lg ${plan.popular ? 'text-electric-blue dark:text-electric-blue/90' : 'text-slate-800 dark:text-slate-200'}`}>
                  {plan.name}
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] line-through text-slate-400 font-bold decoration-red-400">{plan.originalPrice}</span>
                  <span className={`${
                    plan.popular 
                      ? 'bg-electric-blue text-white shadow-md' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  } text-[11px] px-2.5 py-1 rounded-full font-black tracking-wide mt-0.5`}>
                    {plan.price}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-snug">
                {plan.desc}
              </p>
            </div>
            
            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
              {plan.features.slice(0, 2).map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-2 font-medium">
                  <div className={`w-1.5 h-1.5 rounded-full ${plan.popular ? 'bg-electric-blue' : 'bg-slate-300 dark:bg-slate-600'}`} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}


