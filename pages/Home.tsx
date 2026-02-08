import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Star, Truck, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { PRODUCTS, TESTIMONIALS, CATEGORIES } from '../constants';
import FlowerCard from '../components/FlowerCard';

const Home: React.FC = () => {
  const featured = PRODUCTS.filter(p => p.isFeatured).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FlowerShop",
    "name": "Flower Point",
    "image": "https://images.unsplash.com/photo-1516565349308-c76fe36a115c?q=80&w=1169",
    "@id": "https://flowerpoint.com",
    "url": "https://flowerpoint.com",
    "telephone": "+919000000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Floral Avenue",
      "addressLocality": "Garden City",
      "addressRegion": "GC",
      "postalCode": "54321",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.facebook.com/flowerpoint",
      "https://www.instagram.com/flowerpoint"
    ]
  };

  const getCategoryImage = (cat: string) => {
    switch (cat) {
      case 'Roses':
        return 'https://images.unsplash.com/photo-1552174965-c6616f62fc4f?q=80&w=800&auto=format&fit=crop';
      case 'Bouquets':
        return 'https://images.unsplash.com/photo-1679765858056-408c3d929db6?q=80&w=800&auto=format&fit=crop';
      case 'Wedding':
        return 'https://images.unsplash.com/photo-1488928741225-2aaf732c96cc?q=80&w=800&auto=format&fit=crop';
      case 'Gifts':
        return 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1552174965-c6616f62fc4f?auto=format&fit=crop&w=800';
    }
  };

  return (
    <div className="flex flex-col overflow-x-hidden">
      <Helmet>
        <title>Premium Flower Boutique | Same-Day Delivery | Flower Point</title>
        <meta name="description" content="Discover exquisite hand-tied bouquets and premium floral arrangements at Flower Point. Offering same-day delivery for weddings, gifts, and special occasions." />
        <link rel="canonical" href="https://flowerpoint.com/" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516565349308-c76fe36a115c?q=80&w=1169&auto=format&fit=crop"
            alt="Flower Point Premium Floral Collection Background"
            className="w-full h-full object-cover animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-white text-4xl md:text-7xl font-black mb-4 md:mb-6 animate-in slide-in-from-bottom-10 duration-1000 leading-tight">
            Nature's Poetry, <br /><span className="text-rose-pink">Hand-Delivered.</span>
          </h1>
          <p className="text-white/90 text-base md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-in slide-in-from-bottom-20 duration-1000 delay-200 px-2">
            Experience the finest floral arrangements crafted with passion and delivered with care across the city.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-in slide-in-from-bottom-32 duration-1000 delay-500 w-full px-4">
            <Link to="/shop" className="w-full sm:w-auto bg-rose-pink hover:bg-rose-pink/90 text-white px-10 py-4 rounded-full font-semibold transition-all shadow-xl text-center">
              Browse Collection
            </Link>
            <Link to="/about" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-semibold transition-all text-center">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 md:py-16 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { icon: <Truck className="text-rose-pink" />, title: 'Fast Delivery', desc: 'Same day service' },
            { icon: <ShieldCheck className="text-rose-pink" />, title: 'Freshness', desc: 'Guaranteed 7 days' },
            { icon: <Heart className="text-rose-pink" />, title: 'Eco-Friendly', desc: 'Sustainable sourcing' },
            { icon: <Star className="text-rose-pink" />, title: 'Expert Florists', desc: 'Master artisans' },
          ].map((item, i) => (
            <article key={i} className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 bg-rose-pink/5 rounded-full">{item.icon}</div>
              <h4 className="font-bold text-slate-800 text-sm md:text-base leading-tight">{item.title}</h4>
              <p className="text-xs text-slate-500 hidden sm:block">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-12 space-y-4 md:space-y-0 text-center md:text-left">
            <header>
              <span className="text-rose-pink font-bold uppercase tracking-widest text-xs md:sm mb-2 block">Our Favorites</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Featured Arrangements</h2>
            </header>
            <Link to="/shop" className="flex items-center space-x-2 text-rose-pink font-bold hover:underline">
              <span>View All</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {featured.map(product => (
              <FlowerCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24 bg-rose-pink/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Occasion</h2>
          <p className="text-slate-600 mb-10 md:mb-12 text-sm md:text-base">Capture the moment with the perfect floral bloom.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES.map(cat => (
              <Link
                key={cat}
                to={`/shop?category=${cat}`}
                className="group relative h-48 md:h-64 rounded-2xl md:rounded-3xl overflow-hidden shadow-md"
              >
                <img
                  src={getCategoryImage(cat)}
                  alt={`Shop ${cat} collection at Flower Point`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/50">
                  <h3 className="text-white text-lg md:text-2xl font-bold">{cat}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">Customer Love</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {TESTIMONIALS.map(t => (
              <figure key={t.id} className="bg-premium-cream p-6 md:p-8 rounded-2xl md:rounded-3xl relative">
                <Sparkles className="absolute top-4 right-4 text-rose-pink/10" size={30} />
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(t.rating) ? "#E63973" : "none"} className="text-rose-pink" />
                  ))}
                </div>
                <blockquote className="text-slate-700 italic text-sm md:text-base mb-6 leading-relaxed">"{t.text}"</blockquote>
                <figcaption className="font-bold text-rose-pink text-sm md:text-base">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-slate-900 rounded-3xl md:rounded-[3rem] p-8 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-rose-pink/10 rounded-full blur-3xl -mr-24 -mt-24"></div>

            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 relative z-10">Stay Inspired</h2>
            <p className="text-slate-400 text-sm md:text-lg mb-8 md:mb-10 max-w-xl mx-auto relative z-10">
              Join our list for exclusive floral care tips and seasonal collection early access.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl md:rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-rose-pink text-white text-sm"
                aria-label="Subscribe to newsletter"
              />
              <button className="bg-rose-pink hover:bg-rose-pink/90 text-white px-8 py-4 rounded-xl md:rounded-full font-bold transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
