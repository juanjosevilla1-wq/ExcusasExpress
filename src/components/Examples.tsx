import { motion } from 'motion/react';
import { Play, Pause, Phone, Heart, Users, Briefcase, Stethoscope } from 'lucide-react';
import { useState } from 'react';

const examples = [
  {
    type: "Médica",
    icon: <Stethoscope size={20} />,
    title: "La gastroenteritis express",
    text: "Oye, me he despertado con una indigestión terrible. Creo que fueron los mejillones de anoche... No me atrevo a salir de un radio de 5 metros del baño. ¡Disfrutad por mi!",
    tags: ["Creíble", "Urgente"]
  },
  {
    type: "Laboral",
    icon: <Briefcase size={20} />,
    title: "El error informático",
    text: "Jefe, se me ha quedado el ordenador en bucle con una actualización de Windows del 98. Llevo media hora y va por el 1%. Trabajando desde el móvil pero poco puedo hacer...",
    tags: ["Clásico", "Indiscutible"]
  }
];

export default function Examples({ className = "" }: { className?: string }) {
  return (
    <div className={`bento-card bg-slate-900 border-slate-800 text-white ${className}`}>
      <h3 className="text-yellow-400 font-extrabold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
        Ejemplos Reales
      </h3>
      
      <div className="space-y-4">
        {examples.map((ex, idx) => (
          <div key={idx} className="bg-slate-800/80 rounded-2xl p-4 border-l-4 border-yellow-400 italic text-[13px] text-slate-300 leading-relaxed">
            "{ex.text.substring(0, 80)}..."
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
        <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Audio Actuado</span>
        <div className="flex items-center gap-1.5 bg-green-500/10 px-2.5 py-1 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-[10px] uppercase font-black tracking-wider">En Línea</span>
        </div>
      </div>
    </div>
  );
}


