
import React from 'react';
import { Heart, Sparkles, ShieldCheck, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="relative py-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1552174965-c6616f62fc4f?auto=format&fit=crop&w=1920" 
            alt="Header Bg" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6">Our Story</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">Founded in 2015, we've been on a mission to spread beauty and joy through the power of fresh, thoughtfully arranged flowers.</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-rose-pink font-bold uppercase tracking-wider text-sm">Crafting Emotions</span>
              <h2 className="text-4xl md:text-5xl font-bold">More Than Just a Flower Shop</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                At Flower Point, we believe every flower tells a story. Whether it's a silent apology, a loud celebration, or a gentle whisper of love, our arrangements are designed to speak when words fall short.
              </p>
              <p className="text-slate-600 leading-relaxed">
                What started as a small family project has grown into a community of floral enthusiasts. Our journey has been guided by a deep passion for nature and an unwavering commitment to quality and artistic excellence.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-rose-pink rounded-full blur-3xl opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1552174965-c6616f62fc4f?q=80&w=1170&auto=format&fit=crop" 
                alt="Our Florists at Work" 
                className="rounded-[3rem] shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">The Values That Root Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Heart className="text-rose-pink" />, title: 'Pure Passion', desc: 'Every stem is chosen and placed with genuine love for the craft.' },
              { icon: <ShieldCheck className="text-rose-pink" />, title: 'Quality First', desc: 'We source only the freshest blooms from sustainable local growers.' },
              { icon: <Sparkles className="text-rose-pink" />, title: 'Creativity', desc: 'Blending traditional elegance with modern artistic floral design.' },
              { icon: <Users className="text-rose-pink" />, title: 'Community', desc: 'Committed to brightening our city one bouquet at a time.' }
            ].map((v, i) => (
              <div key={i} className="text-center p-8 border border-slate-100 rounded-3xl hover:shadow-xl transition-all hover:border-rose-pink/20">
                <div className="bg-rose-pink/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Philosophy */}
      <section className="py-24 bg-premium-cream">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 italic font-serif">"Flowers are nature's art, and we are simply the curators of its beauty."</h2>
          <div className="w-20 h-1 bg-rose-pink mx-auto mb-8"></div>
          <p className="text-slate-700 text-lg leading-relaxed mb-12">
            Our team consists of certified master florists who have spent years studying botanical aesthetics and floral preservation. We don't just sell products; we offer experiences that linger in the memory of our customers long after the petals have fallen.
          </p>
          <img 
            src="https://images.unsplash.com/photo-1679765858056-408c3d929db6?auto=format&fit=crop&w=1200" 
            alt="Studio" 
            className="rounded-[3rem] shadow-lg w-full h-96 object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default About;
