
import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';
import { DELIVERY_FEE } from '../constants';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = cart.length > 0 ? subtotal + DELIVERY_FEE : 0;

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[200] flex justify-end">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
        
        {/* Drawer */}
        <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="text-rose-pink" size={24} />
              <h2 className="text-xl font-bold text-slate-900">Your Basket</h2>
              <span className="bg-rose-pink/10 text-rose-pink text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                  <ShoppingBag size={40} className="text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium">Your basket is empty</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-rose-pink font-bold text-sm hover:underline"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-50">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-slate-800 truncate pr-2">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-300 hover:text-rose-pink transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-rose-pink font-bold text-sm mt-1">₹{item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="flex items-center border border-slate-100 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-slate-50 text-slate-500"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-slate-50 text-slate-500"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-slate-500 text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-700">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 text-sm">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-slate-700">₹{DELIVERY_FEE.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-slate-900 font-bold text-lg pt-2 border-t border-slate-200">
                <span>Grand Total</span>
                <span className="text-rose-pink">₹{total.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-rose-pink hover:bg-rose-pink/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-pink/20 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
              >
                <span>Checkout</span>
                <ArrowRight size={18} />
              </button>
              <p className="text-[10px] text-center text-slate-400">Secure checkout via WhatsApp</p>
            </div>
          )}
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cart={cart}
        total={total}
        clearCart={clearCart}
      />
    </>
  );
};

export default CartDrawer;
