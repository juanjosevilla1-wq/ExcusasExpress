import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Bot, Send, Loader2, Smartphone, CreditCard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function FlowModal({ isOpen, onClose, planName = "Pase de Emergencia", price = 0.25 }: { isOpen: boolean; onClose: () => void; planName?: string; price?: number }) {
  const [step, setStep] = useState<'checkout' | 'bizum' | 'bizum-auth' | 'paypal' | 'paypal-auth' | 'paypal-verify' | 'chat'>('checkout');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<{role: 'bot'|'user', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  // Realism States
  const [bizumPhone, setBizumPhone] = useState('');
  const [bizumPin, setBizumPin] = useState('');
  const [bizumAttempts, setBizumAttempts] = useState(0);
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPass, setPaypalPass] = useState('');
  const [paypalCode, setPaypalCode] = useState('');
  
  const [bizumError, setBizumError] = useState('');
  const [paypalError, setPaypalError] = useState('');

  const formattedPrice = price.toFixed(2).replace('.', ',');
  const displayPlanName = planName === "Pase de Emergencia" ? planName : `Plan: ${planName}`;
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStep('checkout');
      setMessages([]);
      setIsProcessing(false);
      setInputValue('');
      setBizumPhone('');
      setBizumPin('');
      setBizumAttempts(0);
      setPaypalEmail('');
      setPaypalPass('');
      setPaypalCode('');
      setBizumError('');
      setPaypalError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === 'chat' && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{ role: 'bot', text: '¡Hola! ¿En qué lío te has metido hoy y de qué necesitas escapar?' }]);
        setIsTyping(false);
      }, 1000);
    }
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step, messages]);

  if (!isOpen) return null;

  const handleBizumNext = () => {
    const cleaned = bizumPhone.replace(/\D/g, '');
    if (cleaned.length < 9) {
      setBizumError('El teléfono debe tener al menos 9 dígitos');
      return;
    }
    setBizumError('');
    setStep('bizum-auth');
  };

  const handleBizumSubmit = () => {
    setIsProcessing(true);
    setBizumError('');
    
    setTimeout(() => {
      setIsProcessing(false);
      const nextAttempts = bizumAttempts + 1;
      setBizumAttempts(nextAttempts);
      setBizumPin('');
      
      if (nextAttempts % 2 === 0) {
        setBizumError('Estamos experimentando problemas para procesar tu pago con este servicio. Inténtalo de nuevo más tarde o usa otro método.');
      } else {
        setBizumError('El código o PIN introducido no es válido. Comprueba el SMS de tu banco e inténtalo de nuevo.');
      }
    }, 1200);
  };

  const handlePaypalAuthNext = () => {
    const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rx.test(paypalEmail)) {
      setPaypalError('Correo electrónico inválido');
      return;
    }
    if (paypalPass.length < 4) {
      setPaypalError('La contraseña es demasiado corta');
      return;
    }
    setPaypalError('');
    setStep('paypal-verify');
  };

  const handlePaypalNext = () => setStep('paypal-auth');

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('chat');
    }, 2000);
  };
  
  const handleSend = async () => {
      if (inputValue.trim() && !isTyping) {
        const currentInput = inputValue;
        const updatedMessages = [...messages, { role: 'user' as const, text: currentInput }];
        setMessages(updatedMessages);
        setInputValue('');
        setIsTyping(true);
        
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: updatedMessages })
          });
          
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || "API error");
          }
          
          setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
        } catch (error: any) {
           setMessages(prev => [...prev, { role: 'bot', text: error.message || 'Ups, la IA se quedó en blanco. Inténtalo de nuevo.' }]);
        } finally {
           setIsTyping(false);
        }
      }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm sm:p-4">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full h-[90vh] sm:h-[80vh] sm:max-w-md bg-slate-50 dark:bg-slate-950 rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative"
      >
        {/* Grab handle for mobile */}
        <div className="sm:hidden absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full z-20"></div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-slate-200/80 dark:bg-slate-800/80 rounded-full hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
        >
          <X size={18} className="text-slate-700 dark:text-slate-300" />
        </button>

        <AnimatePresence mode="wait">
          {step === 'checkout' && (
            <motion.div 
              key="checkout"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col p-6 pt-12 sm:p-8 justify-center items-center text-center overflow-y-auto"
            >
              <div className="w-20 h-20 bg-electric-blue/10 dark:bg-electric-blue/20 rounded-[2rem] flex items-center justify-center mb-6 text-electric-blue shadow-inner">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-black mb-2 dark:text-white mt-2 leading-tight">{displayPlanName}</h2>
              <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-6 max-w-[250px] font-medium leading-snug">
                Adquiere este plan y desbloquea el chat experto.
              </p>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] w-full shadow-sm border border-slate-100 dark:border-slate-800 mb-6 relative">
                <div className="flex justify-center items-baseline gap-2 mb-1">
                  <span className="text-6xl font-black text-electric-blue tracking-tighter">{formattedPrice.split(',')[0]},{formattedPrice.split(',')[1]}</span>
                  <span className="text-3xl font-bold text-electric-blue">€</span>
                </div>
                <div className="text-sm font-bold text-slate-400 line-through decoration-red-400 decoration-2 mt-2">
                  PVP: {(price * 2).toFixed(2).replace('.', ',')}€
                </div>
                <div className="absolute -top-3 right-4 bg-green-500 text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider transform rotate-[5deg]">
                  50% Off
                </div>
              </div>

              <div className="mt-auto w-full pb-safe space-y-3">
                <button 
                  onClick={() => setStep('bizum')}
                  className="w-full bg-[#000000] dark:bg-[#1a1a1a] text-white py-4 rounded-2xl font-black text-[17px] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-black/20"
                >
                  <Smartphone size={20} />
                  Pagar con Bizum
                </button>
                <button 
                  onClick={() => setStep('paypal')}
                  className="w-full bg-[#003087] text-white py-4 rounded-2xl font-black text-[17px] flex items-center justify-center gap-3 hover:bg-[#002260] transition-all active:scale-95 shadow-lg shadow-blue-900/20"
                >
                  <CreditCard size={20} />
                  Pagar con PayPal
                </button>
                <div className="flex items-center justify-center gap-2 mt-2 opacity-60">
                   <Lock size={12} />
                   <p className="text-[10px] font-black tracking-widest uppercase">
                     Pasarela 100% Segura
                   </p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'bizum' && (
            <motion.div 
              key="bizum"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col p-6 pt-16 sm:p-8 justify-start items-center text-center overflow-y-auto"
            >
              <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#00C3A9]"></div>
                <h3 className="text-2xl font-black text-[#001D3D] dark:text-white mb-2">Bizum</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
                  Total a pagar: <strong className="text-black dark:text-white">{formattedPrice}€</strong> al comercio <span className="text-electric-blue">ExcusasExpress</span>
                </p>
                
                <div className="text-left mb-6">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Tu número de teléfono
                  </label>
                  <input 
                    type="tel" 
                    value={bizumPhone}
                    onChange={(e) => {
                      setBizumPhone(e.target.value);
                      if (bizumError) setBizumError('');
                    }}
                    placeholder="Ej. +34 600 000 000"
                    disabled={isProcessing}
                    className={`w-full bg-slate-50 dark:bg-slate-800 border-2 rounded-xl px-4 py-3 text-lg font-bold text-center outline-none focus:border-[#00C3A9] transition-colors disabled:opacity-50 dark:text-white ${bizumError ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                  />
                  {bizumError && <p className="text-red-500 text-xs font-bold mt-2 text-center">{bizumError}</p>}
                </div>

                <button 
                  onClick={handleBizumNext}
                  disabled={bizumPhone.length < 9}
                  className="w-full bg-[#001D3D] text-white py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 disabled:opacity-50"
                >
                  Continuar
                </button>
                <div className="mt-4">
                  <button onClick={() => setStep('checkout')} disabled={isProcessing} className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 uppercase tracking-widest transition-colors mb-2">
                    Volver atrás
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'bizum-auth' && (
            <motion.div 
              key="bizum-auth"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col p-6 pt-16 sm:p-8 justify-start items-center text-center overflow-y-auto"
            >
              <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#00C3A9]"></div>
                <div className="flex justify-center mb-4 text-[#00C3A9]">
                  <Lock size={40} />
                </div>
                <h3 className="text-xl font-black text-[#001D3D] dark:text-white mb-2">Verificación de Seguridad</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
                  Introduce tu PIN de Bizum o la clave recibida en {bizumPhone || "tu teléfono"} para autorizar el pago.
                </p>
                
                <div className="text-left mb-6">
                  <input 
                    type="password" 
                    maxLength={4}
                    value={bizumPin}
                    onChange={(e) => {
                      setBizumPin(e.target.value);
                      if (bizumError) setBizumError('');
                    }}
                    placeholder="••••"
                    disabled={isProcessing}
                    className={`w-full bg-slate-50 dark:bg-slate-800 border-2 rounded-xl px-4 py-3 text-2xl tracking-[1em] font-bold text-center outline-none focus:border-[#00C3A9] transition-colors disabled:opacity-50 dark:text-white ${bizumError ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                  />
                  {bizumError && <p className="text-red-500 text-[11px] font-bold mt-3 text-center leading-snug max-w-[280px] mx-auto">{bizumError}</p>}
                </div>

                <button 
                  onClick={handleBizumSubmit}
                  disabled={bizumPin.length < 4 || isProcessing}
                  className="w-full bg-[#00C3A9] text-white py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#00a892] transition-all active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? (
                     <Loader2 className="animate-spin text-white" size={24} />
                  ) : (
                     "Confirmar Pago"
                  )}
                </button>
                <div className="mt-4">
                  <button onClick={() => setStep('bizum')} disabled={isProcessing} className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mb-2">
                    Cancelar operación
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'paypal' && (
            <motion.div 
              key="paypal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col p-6 pt-16 sm:p-8 justify-start items-center text-center overflow-y-auto"
            >
              <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#003087]"></div>
                <h3 className="text-2xl font-black text-[#003087] dark:text-white mb-2 italic tracking-tight">PayPal</h3>
                <div className="text-left bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-6">
                   <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                     Pagar a
                   </p>
                   <p className="text-lg font-black text-slate-900 dark:text-white">
                     ExcusasExpress S.L.
                   </p>
                   <div className="my-3 border-t border-slate-200 dark:border-slate-700"></div>
                   <div className="flex justify-between items-center text-xl font-black">
                     <span className="text-slate-700 dark:text-slate-300">Importe</span>
                     <span className="text-black dark:text-white">{formattedPrice} €</span>
                   </div>
                </div>

                <button 
                  onClick={handlePaypalNext}
                  className="w-full bg-[#FFC439] text-[#003087] py-3.5 rounded-full font-black text-lg flex items-center justify-center gap-2 hover:bg-[#F4BB33] transition-all active:scale-95"
                >
                  Continuar
                </button>
                
                <div className="mt-6">
                  <button onClick={() => setStep('checkout')} disabled={isProcessing} className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 uppercase tracking-widest transition-colors mb-2">
                    Cancelar y volver
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'paypal-auth' && (
            <motion.div 
              key="paypal-auth"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col p-6 pt-16 sm:p-8 justify-start items-center text-center overflow-y-auto"
            >
              <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#003087]"></div>
                <h3 className="text-2xl font-black text-[#003087] dark:text-white mb-2 italic tracking-tight">PayPal</h3>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-6">
                  Inicia sesión de forma segura para autorizar el pago de {formattedPrice}€.
                </p>
                
                {paypalError && <p className="text-red-500 text-xs font-bold mb-4 text-center">{paypalError}</p>}

                <div className="text-left mb-3">
                  <input 
                    type="email" 
                    value={paypalEmail}
                    onChange={(e) => {
                      setPaypalEmail(e.target.value);
                      if (paypalError) setPaypalError('');
                    }}
                    placeholder="Correo electrónico"
                    disabled={isProcessing}
                    className={`w-full bg-transparent border rounded-md px-4 py-3 text-[15px] outline-none focus:border-[#003087] transition-colors disabled:opacity-50 dark:text-white ${paypalError && !paypalEmail.includes('@') ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}`}
                  />
                </div>
                <div className="text-left mb-6">
                  <input 
                    type="password" 
                    value={paypalPass}
                    onChange={(e) => {
                      setPaypalPass(e.target.value);
                      if (paypalError) setPaypalError('');
                    }}
                    placeholder="Contraseña"
                    disabled={isProcessing}
                    className={`w-full bg-transparent border rounded-md px-4 py-3 text-[15px] outline-none focus:border-[#003087] transition-colors disabled:opacity-50 dark:text-white ${paypalError && paypalPass.length < 4 ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}`}
                  />
                </div>

                <button 
                  onClick={handlePaypalAuthNext}
                  disabled={!paypalEmail || !paypalPass || isProcessing}
                  className="w-full bg-[#003087] text-white py-3.5 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#002260] transition-all active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? (
                     <Loader2 className="animate-spin text-white" size={24} />
                  ) : (
                     "Iniciar Sesión y Pagar"
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 mt-4 opacity-60 text-[#003087] dark:text-slate-300">
                   <Lock size={12} />
                   <p className="text-[10px] font-bold tracking-wide">
                     Protección del Comprador
                   </p>
                </div>
                
                <div className="mt-4">
                  <button onClick={() => setStep('paypal')} disabled={isProcessing} className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mb-2">
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'paypal-verify' && (
            <motion.div 
              key="paypal-verify"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col p-6 pt-16 sm:p-8 justify-start items-center text-center overflow-y-auto"
            >
              <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#003087]"></div>
                <div className="flex justify-center mb-4 text-[#003087]">
                  <Lock size={40} />
                </div>
                <h3 className="text-xl font-black text-[#003087] dark:text-white mb-2">Verificación en dos pasos</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  Para tu seguridad, hemos enviado un código a <br/><strong className="text-slate-800 dark:text-slate-200">{paypalEmail}</strong>. Introdúcelo a continuación.
                </p>
                
                <div className="text-left mb-6">
                  <input 
                    type="password" 
                    maxLength={6}
                    value={paypalCode}
                    onChange={(e) => setPaypalCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    disabled={isProcessing}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-2xl tracking-[0.5em] font-bold text-center outline-none focus:border-[#003087] transition-colors disabled:opacity-50 dark:text-white"
                  />
                </div>

                <button 
                  onClick={handleSimulatePayment}
                  disabled={paypalCode.length < 6 || isProcessing}
                  className="w-full bg-[#003087] text-white py-3.5 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#002260] transition-all active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? (
                     <Loader2 className="animate-spin text-white" size={24} />
                  ) : (
                     "Verificar y Pagar"
                  )}
                </button>
                <div className="mt-4">
                  <button onClick={() => setStep('paypal-auth')} disabled={isProcessing} className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mb-2">
                    Volver atrás
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'chat' && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950"
            >
              {/* Chat Header */}
              <div className="px-5 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 relative z-10 pt-14 sm:pt-6">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-tr from-electric-blue to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Bot size={24} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                </div>
                <div className="flex-1 mr-6">
                  <h3 className="font-black text-[17px] leading-tight dark:text-white">ExcusasExpress Bot</h3>
                  <p className="text-[11px] font-extrabold text-blue-500 uppercase tracking-widest">IA Avanzada</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3.5 px-4 rounded-[1.5rem] shadow-sm text-[15px] font-medium leading-snug ${
                      msg.role === 'user' 
                        ? 'bg-electric-blue text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-sm border border-slate-100 dark:border-slate-700'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-800 p-4 px-5 rounded-[1.5rem] rounded-tl-sm border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-1.5 h-[52px]">
                      <span className="w-2 h-2 bg-electric-blue/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-electric-blue/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-electric-blue/50 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                )}
                <div ref={endOfMessagesRef} />
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe">
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-full p-1.5 pr-1.5 border border-transparent focus-within:border-electric-blue/30 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all shadow-inner">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu lío aquí..." 
                    disabled={isTyping}
                    className="flex-1 bg-transparent border-none outline-none px-4 text-[15px] font-medium dark:text-white placeholder-slate-400"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSend();
                    }}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className="w-10 h-10 bg-electric-blue text-white rounded-full flex items-center justify-center shrink-0 transition-all active:scale-90 disabled:opacity-50 disabled:bg-slate-300 dark:disabled:bg-slate-700 shadow-md"
                  >
                    <Send size={18} className="ml-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

