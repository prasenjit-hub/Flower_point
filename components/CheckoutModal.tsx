
import React, { useState, useEffect } from 'react';
import { X, Send, User, Phone, MapPin, CheckCircle2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { SHOP_WHATSAPP_NUMBER, DELIVERY_FEE } from '../constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  clearCart: () => void;
  isDirectBuy?: boolean;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  total, 
  clearCart,
  isDirectBuy = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => { 
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderItems = cart.map(item => `• ${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}`).join('\n');
    
    const message = encodeURIComponent(
      `🌸 *NEW ORDER FROM FLOWER POINT* 🌸\n\n` +
      `*Order Type:* ${isDirectBuy ? 'Quick Buy' : 'Standard Checkout'}\n\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `📍 Address: ${formData.address}\n\n` +
      `*Items Ordered:*\n` +
      `${orderItems}\n\n` +
      `*Order Summary:*\n` +
      `Subtotal: ₹${subtotal.toFixed(2)}\n` +
      `Delivery: ₹${DELIVERY_FEE.toFixed(2)}\n` +
      `--------------------------\n` +
      `*TOTAL: ₹${total.toFixed(2)}*\n\n` +
      `Please confirm my order. Thank you! ✨`
    );

    window.open(`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${message}`, '_blank');
    
    setIsSuccess(true);
    setTimeout(() => {
      if (!isDirectBuy) clearCart();
      onClose();
      setIsSuccess(false);
      setFormData({ name: '', phone: '', address: '' });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Background Blur Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-20 sm:zoom-in-95 duration-500">
        
        {/* Fixed Header */}
        <div className="shrink-0 p-6 sm:p-10 pb-4 sm:pb-6 border-b border-slate-50 bg-premium-cream/30 flex justify-between items-start z-10">
          <div>
            <span className="inline-block px-3 py-1 bg-rose-pink/10 text-rose-pink text-[9px] font-black uppercase tracking-widest rounded-full mb-2">
              {isDirectBuy ? 'Quick Purchase' : 'Checkout'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif leading-tight">Delivery Details</h2>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-2 sm:p-3 bg-white hover:bg-slate-50 rounded-full shadow-sm transition-all text-slate-400 hover:text-slate-600 border border-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 pt-4 space-y-8 no-scrollbar touch-pan-y">
          {isSuccess ? (
            <div className="py-16 text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 animate-bounce">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-3 font-serif">Order Shared!</h2>
              <p className="text-slate-500 text-sm">Redirecting to WhatsApp...</p>
            </div>
          ) : (
            <form id="checkout-form-main" onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-pink transition-colors" size={18} />
                  <input 
                    required
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-14 pr-6 py-4 sm:py-5 bg-slate-50 border-2 border-transparent focus:border-rose-pink/20 focus:bg-white rounded-2xl sm:rounded-3xl outline-none text-sm transition-all font-medium placeholder:text-slate-300"
                  />
                </div>

                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-pink transition-colors" size={18} />
                  <input 
                    required
                    type="tel"
                    placeholder="WhatsApp Number"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-14 pr-6 py-4 sm:py-5 bg-slate-50 border-2 border-transparent focus:border-rose-pink/20 focus:bg-white rounded-2xl sm:rounded-3xl outline-none text-sm transition-all font-medium placeholder:text-slate-300"
                  />
                </div>

                <div className="relative group">
                  <MapPin className="absolute left-5 top-6 text-slate-300 group-focus-within:text-rose-pink transition-colors" size={18} />
                  <textarea 
                    required
                    rows={2}
                    placeholder="Full Delivery Address"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent focus:border-rose-pink/20 focus:bg-white rounded-2xl sm:rounded-3xl outline-none text-sm transition-all resize-none font-medium placeholder:text-slate-300 min-h-[100px]"
                  />
                </div>
              </div>

              {/* Enhanced Order Summary Block */}
              <div className="bg-slate-900 text-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-pink/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="text-rose-pink text-[10px] font-black uppercase tracking-[0.2em]">Your Selection</span>
                  <div className="h-px flex-1 bg-white/10 mx-4"></div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40 font-bold uppercase tracking-widest">Products</span>
                    <span className="font-bold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40 font-bold uppercase tracking-widest">Express Delivery</span>
                    <span className="font-bold text-rose-pink">+ ₹{DELIVERY_FEE.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-4 border border-white/5">
                      <ShoppingBag size={20} className="text-rose-pink" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg leading-tight">Total Payable</h4>
                      <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest">Inclusive of all taxes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-rose-pink tracking-tighter">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Fixed Footer Button */}
        {!isSuccess && (
          <div className="shrink-0 p-6 sm:p-10 pt-2 border-t border-slate-50 bg-white z-20">
            <button 
              type="submit"
              form="checkout-form-main"
              className="w-full bg-rose-pink text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em] py-5 sm:py-6 rounded-2xl sm:rounded-3xl shadow-2xl shadow-rose-pink/30 flex items-center justify-center space-x-3 active:scale-[0.98] transition-all group"
            >
              <span>Place Order via WhatsApp</span>
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
