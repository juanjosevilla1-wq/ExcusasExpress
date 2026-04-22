import { Instagram, Twitter, MessageCircle, ShieldAlert } from 'lucide-react';

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <div className={`col-span-12 flex flex-col sm:flex-row items-center justify-between px-4 text-[10px] text-slate-400 uppercase tracking-widest border-t border-slate-200 dark:border-slate-800 pt-6 pb-2 hidden sm:flex ${className}`}>
      <div>© 2026 Alquiler de Excusas S.L. • Solo fines de entretenimiento</div>
      <div className="flex gap-8 mt-4 sm:mt-0">
        <a href="#" className="hover:text-electric-blue transition-colors">Aviso Legal</a>
        <a href="#" className="hover:text-electric-blue transition-colors">Contacto</a>
        <a href="#" className="hover:text-electric-blue transition-colors">Instagram</a>
        <a href="#" className="hover:text-electric-blue transition-colors">Twitter</a>
      </div>
    </div>
  );
}


