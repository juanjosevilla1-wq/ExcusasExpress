/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import Examples from './components/Examples';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FlowModal from './components/FlowModal';

export default function App() {
  const [isFlowOpen, setIsFlowOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState("Excusa Básica");
  const [selectedPlanPrice, setSelectedPlanPrice] = useState(0.25);

  const handleOpenFlow = (name: string = "Excusa Básica", price: number = 0.25) => {
    setSelectedPlanName(name);
    setSelectedPlanPrice(price);
    setIsFlowOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
      <Navbar onOpenFlow={() => handleOpenFlow()} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-24 sm:pt-28">
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-[repeat(10,minmax(0,auto))] gap-4 sm:gap-6 min-h-[800px]">
          <Hero className="md:col-span-12 lg:col-span-5 lg:row-span-4" onOpenFlow={() => handleOpenFlow()} />
          <HowItWorks className="md:col-span-6 lg:col-span-4 lg:row-span-3" />
          <Examples className="md:col-span-6 lg:col-span-3 lg:row-span-3" />
          
          <Services className="md:col-span-12 lg:col-span-7 lg:row-span-5" onOpenFlow={handleOpenFlow} />
          
          <Testimonials className="md:col-span-6 lg:col-span-2 lg:row-span-3" />
          <CTA className="md:col-span-6 lg:col-span-3 lg:row-span-4" onOpenFlow={() => handleOpenFlow()} />
          
          <Footer className="md:col-span-12" />
        </div>
      </main>
      <FlowModal 
        isOpen={isFlowOpen} 
        onClose={() => setIsFlowOpen(false)} 
        planName={selectedPlanName}
        price={selectedPlanPrice}
      />
    </div>
  );
}





