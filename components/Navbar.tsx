
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Flower, ShoppingBag, ArrowRight, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/', id: '01' },
    { name: 'Shop', path: '/shop', id: '02' },
    { name: 'About', path: '/about', id: '03' },
    { name: 'Contact', path: '/contact', id: '04' },
  ];

  const isSolid = !isHomePage || scrolled || isOpen;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[120] transition-all duration-500 ${isSolid ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-12">
          <Link to="/" className="flex items-center space-x-2 z-[130]" onClick={() => setIsOpen(false)}>
            <Flower className={`w-7 h-7 md:w-8 h-8 ${isSolid ? 'text-rose-pink' : 'text-white'}`} />
            <h2 className={`text-xl md:text-2xl font-bold font-serif ${isSolid ? 'text-slate-900' : 'text-white'}`}>
              Flower Point
            </h2>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-widest relative group transition-colors ${location.pathname === link.path
                    ? 'text-rose-pink'
                    : isSolid ? 'text-slate-700 hover:text-rose-pink' : 'text-white/90 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 group transition-transform active:scale-95 ml-4"
              aria-label="View shopping cart"
            >
              <ShoppingBag className={isSolid ? 'text-slate-700 group-hover:text-rose-pink' : 'text-white'} size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-pink text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile UI */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 z-[130]"
              aria-label="View shopping cart"
            >
              <ShoppingBag className={isOpen ? 'text-slate-900' : isSolid ? 'text-slate-900' : 'text-white'} size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-pink text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              className="z-[130] p-2 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              <div className="relative w-6 h-5">
                <span className={`absolute left-0 block w-full h-0.5 transform transition-all duration-300 ${isOpen ? 'rotate-45 top-2 bg-slate-900' : `top-0 ${isSolid ? 'bg-slate-900' : 'bg-white'}`}`}></span>
                <span className={`absolute left-0 block h-0.5 bg-current transform transition-all duration-200 top-2 ${isOpen ? 'w-0 opacity-0' : `w-full ${isSolid ? 'text-slate-900' : 'text-white'}`}`}></span>
                <span className={`absolute left-0 block w-full h-0.5 transform transition-all duration-300 ${isOpen ? '-rotate-45 top-2 bg-slate-900' : `top-4 ${isSolid ? 'bg-slate-900' : 'bg-white'}`}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`md:hidden fixed inset-0 w-full h-screen z-[115] transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full invisible'
        }`}>
        <div className="absolute inset-0 bg-white"></div>
        <div className="relative h-full flex flex-col pt-24 pb-12 px-8 overflow-y-auto">
          <div className="flex flex-col space-y-6 mb-10">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-baseline space-x-4 transition-all ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                  }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xs font-bold text-rose-pink/40 font-mono">{link.id}</span>
                <span className={`text-4xl font-serif font-black ${location.pathname === link.path ? 'text-rose-pink' : 'text-slate-900'
                  }`}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          <Link
            to="/shop"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center space-x-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold shadow-xl mb-12 self-start"
          >
            <span>Explore Boutique</span>
            <ArrowRight size={20} className="text-rose-pink" />
          </Link>

          <div className="mt-auto pt-8 border-t border-slate-100">
            <div className="flex space-x-6 mb-6">
              <Instagram size={20} className="text-slate-400" />
              <Facebook size={20} className="text-slate-400" />
              <MessageCircle size={20} className="text-slate-400" />
            </div>
            <p className="text-slate-900 font-bold text-sm">hello@flowerpoint.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
