import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "@pablo_escobar_del_plan",
    text: "La excusa del perro que se comió las llaves del coche es 10/10. Mi jefe me pidió foto y la IA me generó una con el perro con cara de arrepentido. Increíble.",
    role: "Evitador Serial de Afterworks"
  },
  {
    name: "Marta G.",
    text: "Tenía una cita con un pesado y usé el 'Nivel Dios'. Me mandaron hasta un justificante médico del veterinario. Me libré por completo y encima quedé como una santa.",
    role: "Libre por fin"
  },
  {
    name: "Juanito_Pelotas",
    text: "La nota de voz con ruidos de aeropuerto me salvó del bautizo de mi prima. 10 euros mejor invertidos de mi vida. Gracias equipo.",
    role: "Viajero 'Imaginario'"
  }
];

export default function Testimonials({ className = "" }: { className?: string }) {
  return (
    <div className={`bento-card border-none bg-gradient-to-br from-soft-yellow to-yellow-100 dark:from-yellow-900/40 dark:to-yellow-900/20 text-slate-900 dark:text-yellow-100 shadow-inner ${className}`}>
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-[14px] font-bold leading-relaxed italic opacity-90">
          "{testimonials[0].text.substring(0, 110)}..."
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-yellow-300 dark:border-yellow-800/50 flex justify-between items-center">
        <p className="text-xs font-black tracking-wide">
          — {testimonials[0].name}
        </p>
        <span className="text-[10px] uppercase font-bold bg-white/40 dark:bg-black/20 px-2 py-1 rounded-full">VIP</span>
      </div>
    </div>
  );
}


