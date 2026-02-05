
import React from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! Our florists will get back to you shortly.');
  };

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-premium-cream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Get in Touch</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">Have a special request or a question about our collections?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm flex items-start space-x-4 md:space-x-6">
              <div className="bg-rose-pink/5 p-3 rounded-xl text-rose-pink"><MapPin size={20} /></div>
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Our Studio</h3>
                <p className="text-slate-500 text-xs md:text-sm">Flower Point Shop, Blossom Street<br/>Dharmanagar, Tripura 799250</p>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm flex items-start space-x-4 md:space-x-6">
              <div className="bg-emerald-500/5 p-3 rounded-xl text-emerald-500"><Phone size={20} /></div>
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Call Us</h3>
                <p className="text-slate-500 text-xs md:text-sm">+91 8837074757<br/>Mon-Sat, 9am - 7pm</p>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm flex items-start space-x-4 md:space-x-6">
              <div className="bg-blue-500/5 p-3 rounded-xl text-blue-500"><Mail size={20} /></div>
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Email</h3>
                <p className="text-slate-500 text-xs md:text-sm">hello@flowerpoint.com<br/>Support 24/7</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-2xl md:rounded-[3rem] shadow-sm">
            <h2 className="text-2xl font-bold mb-6 md:mb-8">Message Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <input 
                  type="text" 
                  required
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-rose-pink outline-none text-sm"
                  placeholder="Full Name"
                />
                <input 
                  type="email" 
                  required
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-rose-pink outline-none text-sm"
                  placeholder="Email Address"
                />
              </div>
              <input 
                type="text" 
                required
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-rose-pink outline-none text-sm"
                placeholder="Subject"
              />
              <textarea 
                required
                rows={4}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-rose-pink outline-none resize-none text-sm"
                placeholder="How can we help?"
              ></textarea>
              <button 
                type="submit"
                className="w-full bg-rose-pink text-white font-bold py-5 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
              >
                <Send size={18} />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 md:mt-24 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-md h-64 md:h-[500px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233.78103565270143!2d92.17375047233605!3d24.380888776792922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751ed002e98159f%3A0x8a55dc50afe66585!2sFlower%20Point!5e0!3m2!1sen!2sin!4v1770321910481!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
