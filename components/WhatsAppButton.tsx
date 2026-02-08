
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SHOP_WHATSAPP_NUMBER } from '../constants';

const WhatsAppButton: React.FC = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello Flower Point! 🌸 I'm interested in your floral arrangements. Could you help me with a selection?");
    window.open(`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center">
      <button 
        onClick={handleWhatsAppClick}
        className="group flex items-center bg-white hover:bg-slate-50 text-slate-900 p-2 md:px-6 md:py-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100 transition-all duration-300 hover:-translate-y-1 active:scale-95"
        aria-label="Contact us on WhatsApp"
      >
        <div className="relative md:mr-3 shrink-0">
          <div className="bg-[#25D366] text-white p-2 rounded-full shadow-sm flex items-center justify-center">
            <MessageCircle size={20} fill="currentColor" className="md:w-5 md:h-5" />
          </div>
          {/* Online Indicator Dot - Resized for better proportion */}
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#25D366] border-2 border-white rounded-full"></span>
        </div>
        
        {/* Text hidden on mobile/tablet, shown on desktop (md screen and up) */}
        <div className="hidden md:flex flex-col items-start text-left">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-rose-pink leading-none mb-0.5">Florist Online</span>
          <span className="text-sm font-bold tracking-tight">Chat with us</span>
        </div>
      </button>
    </div>
  );
};

export default WhatsAppButton;
