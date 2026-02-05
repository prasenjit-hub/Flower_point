
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Flower, Instagram, Facebook, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
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
      <nav className={`fixed top-0 w-full z-[120] transition-all duration-500 ${
        isSolid ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group z-[130]" onClick={() => setIsOpen(false)}>
            <Flower className={`w-7 h-7 md:w-8 h-8 ${isSolid ? 'text-rose-pink' : 'text-white'} transition-colors duration-300`} />
            <h2 className={`text-xl md:text-2xl font-bold font-serif ${isSolid ? 'text-slate-900' : 'text-white'} transition-colors duration-300`}>
              Flower Point
            </h2>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors text-sm uppercase tracking-wider relative group ${
                  location.pathname === link.path 
                  ? 'text-rose-pink' 
                  : isSolid ? 'text-slate-700 hover:text-rose-pink' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-pink transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}
            
            {/* Cart Icon Desktop */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 group transition-transform active:scale-95 ml-4"
            >
              <ShoppingBag className={isSolid ? 'text-slate-700 group-hover:text-rose-pink' : 'text-white'} size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-pink text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in zoom-in duration-300 border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Icons */}
          <div className="flex items-center space-x-1 md:hidden">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 z-[130] transition-transform active:scale-90"
            >
              <ShoppingBag className={isOpen ? 'text-slate-900' : isSolid ? 'text-slate-900' : 'text-white'} size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-rose-pink text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <button 
              className="z-[130] p-3 focus:outline-none transition-transform active:scale-90" 
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

      {/* Premium Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 w-full h-screen z-[115] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'
      }`}>
        {/* Background Layers with staggered fade */}
        <div className={`absolute inset-0 bg-white transition-opacity duration-700 delay-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute inset-0 bg-gradient-to-b from-rose-pink/5 to-transparent transition-opacity duration-1000 delay-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-1/4 -right-20 w-80 h-80 bg-rose-pink/5 rounded-full blur-[100px] transition-transform duration-[2000ms] delay-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
        
        <div className="relative h-full flex flex-col pt-32 pb-12 px-8 overflow-y-auto">
          {/* Menu Items with staggered slide and fade */}
          <div className="flex flex-col space-y-8 mb-12">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                style={{ 
                  transitionDelay: isOpen ? `${300 + index * 120}ms` : '0ms',
                  transform: isOpen ? 'translateX(0)' : 'translateX(-40px)',
                  opacity: isOpen ? 1 : 0
                }}
                className={`group flex items-baseline space-x-4 transition-all duration-700 ease-out`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xs font-bold text-rose-pink/40 font-mono tracking-tighter">
                  {link.id}
                </span>
                <span className={`text-4xl sm:text-5xl font-serif font-black tracking-tight transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-rose-pink' : 'text-slate-900 group-hover:text-rose-pink'
                }`}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Quick Shop Action */}
          <div 
            style={{ 
              transitionDelay: isOpen ? '800ms' : '0ms',
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isOpen ? 1 : 0
            }}
            className="transition-all duration-700 ease-out"
          >
            <Link 
              to="/shop" 
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center space-x-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-slate-900/10 mb-12"
            >
              <span>Explore Boutique</span>
              <ArrowRight size={20} className="text-rose-pink" />
            </Link>
          </div>

          {/* Mobile Menu Footer */}
          <div 
            style={{ 
              transitionDelay: isOpen ? '950ms' : '0ms',
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isOpen ? 1 : 0
            }}
            className="mt-auto transition-all duration-700 ease-out"
          >
            <div className="flex items-center space-x-6 mb-8">
              <a href="#" className="w-11 h-11 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-pink hover:border-rose-pink/20 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-11 h-11 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-pink hover:border-rose-pink/20 transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-11 h-11 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-pink hover:border-rose-pink/20 transition-all">
                <MessageCircle size={20} />
              </a>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Contact Us</p>
              <p className="text-slate-900 font-bold text-sm">hello@flowerpoint.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
