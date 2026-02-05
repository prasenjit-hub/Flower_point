
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-white text-2xl font-bold font-serif mb-4">Flower Point</h3>
          <p className="text-sm leading-relaxed mb-6">
            Crafting emotions through nature's most beautiful creations. Bringing premium floral experiences to your doorstep since 2015.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-rose-pink transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-rose-pink transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-rose-pink transition-colors"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white text-lg font-bold font-serif mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-rose-pink transition-colors">Home</Link></li>
            <li><Link to="/shop" className="hover:text-rose-pink transition-colors">Shop Collection</Link></li>
            <li><Link to="/about" className="hover:text-rose-pink transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-rose-pink transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-lg font-bold font-serif mb-6">Customer Care</h4>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-rose-pink transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-rose-pink transition-colors">Return Policy</a></li>
            <li><a href="#" className="hover:text-rose-pink transition-colors">Gift Cards</a></li>
            <li><a href="#" className="hover:text-rose-pink transition-colors">Floral Care Tips</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-lg font-bold font-serif mb-6">Get in Touch</h4>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-rose-pink mt-1 shrink-0" />
              <span>123 Floral Avenue, Blossom District, Garden City, 54321</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-rose-pink shrink-0" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-rose-pink shrink-0" />
              <span>hello@flowerpoint.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Flower Point Floral Boutique. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
