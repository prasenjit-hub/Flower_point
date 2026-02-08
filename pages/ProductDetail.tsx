import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import {
  ArrowLeft, ShoppingCart, Zap, Star, ShieldCheck,
  Truck, Clock, Info, Heart, ChevronRight, ChevronLeft
} from 'lucide-react';
import FlowerCard from '../components/FlowerCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, setDirectBuyItem } = useCart();

  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);
  const images = useMemo(() => product?.images || [product?.image || ''], [product]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentIndex(0);
  }, [id]);

  const schema = product ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": images,
    "description": product.description,
    "sku": `FP-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": "Flower Point"
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "INR",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "24"
    }
  } : null;

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [images.length, isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [images.length, isAnimating]);

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-rose-pink font-bold hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-24 md:pt-32 pb-20">
      {product && (
        <Helmet>
          <title>{product.name} | Premium {product.category} | Flower Point</title>
          <meta name="description" content={product.longDescription || product.description} />
          {product.image && <meta property="og:image" content={product.image} />}
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}
      <div className="container mx-auto px-4 md:px-6">
        {/* Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-slate-500 hover:text-rose-pink transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm uppercase tracking-widest">Back to Gallery</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Carousel */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-slate-100 shadow-2xl group/carousel">
              <div className="w-full h-full relative">
                <img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`${product.name} - Detailed floral view ${currentIndex + 1}`}
                  className={`w-full h-full object-cover transition-all duration-700 ease-out transform ${isAnimating ? 'scale-105 opacity-80' : 'scale-100 opacity-100'
                    }`}
                />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-rose-pink hover:text-white active:scale-90"
                    aria-label="Previous flower image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-rose-pink hover:text-white active:scale-90"
                    aria-label="Next flower image"
                  >
                    <ChevronRight size={24} />
                  </button>

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 px-4 py-2 bg-black/10 backdrop-blur-sm rounded-full">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                          }`}
                        aria-label={`Go to image slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 transition-all border-2 ${currentIndex === idx ? 'border-rose-pink shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div className="flex flex-col">
            <header className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-rose-pink/10 text-rose-pink text-[10px] font-black uppercase tracking-widest rounded-full">
                {product.category}
              </span>
              <div className="flex text-amber-400" aria-label="5 star rating">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-xs font-bold text-slate-400">(24 Reviews)</span>
            </header>

            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 font-serif leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline space-x-3 mb-8">
              <span className="text-4xl font-black text-rose-pink">₹{product.price.toFixed(2)}</span>
              <span className="text-slate-400 text-sm line-through">₹{(product.price * 1.2).toFixed(2)}</span>
            </div>

            <section className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100">
              <p className="text-slate-600 leading-relaxed italic">
                "{product.longDescription || product.description}"
              </p>
            </section>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-2xl border border-slate-50 shadow-sm">
                <Clock className="text-rose-pink" size={20} />
                <div>
                  <h4 className="text-[10px] text-slate-400 font-bold uppercase">Stays Fresh</h4>
                  <p className="text-sm font-bold text-slate-800">{product.freshness || '7 Days'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-2xl border border-slate-50 shadow-sm">
                <Truck className="text-rose-pink" size={20} />
                <div>
                  <h4 className="text-[10px] text-slate-400 font-bold uppercase">Delivery</h4>
                  <p className="text-sm font-bold text-slate-800">Same Day</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 flex items-center justify-center space-x-3 bg-slate-900 text-white py-5 rounded-3xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
              >
                <ShoppingCart size={20} />
                <span>Add to Basket</span>
              </button>
              <button
                onClick={() => setDirectBuyItem({ ...product, quantity: 1 })}
                className="flex-1 flex items-center justify-center space-x-3 bg-rose-pink text-white py-5 rounded-3xl font-bold hover:bg-rose-pink/90 transition-all active:scale-95 shadow-xl shadow-rose-pink/20"
              >
                <Zap size={20} fill="currentColor" />
                <span>Buy on WhatsApp</span>
              </button>
            </div>

            {/* Trust Badges */}
            <footer className="border-t border-slate-100 pt-8 grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span className="text-xs font-bold text-slate-500 uppercase">Quality Guaranteed</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart size={18} className="text-rose-pink" />
                <span className="text-xs font-bold text-slate-500 uppercase">Hand-Tied with Love</span>
              </div>
            </footer>
          </div>
        </div>

        {/* Care Instructions Section */}
        <section className="mt-24 bg-rose-pink/5 rounded-[3rem] p-8 md:p-16">
          <div className="max-w-3xl mx-auto text-center">
            <Info size={32} className="text-rose-pink mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Florist's Care Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-pink" />
                  Trim Stems
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">Cut 1 inch off the bottom at a 45° angle upon arrival to boost hydration.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-pink" />
                  Fresh Water
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">Change water every 2 days to keep bacteria away from stems and extend life.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-pink" />
                  Cool Spot
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">Keep away from direct sunlight, heating vents, and ripening fruit.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <div className="flex justify-between items-end mb-10">
              <header>
                <h2 className="text-3xl font-bold text-slate-900">Related Arrangements</h2>
                <p className="text-slate-500 text-sm mt-1">Discover more stunning flowers from our {product.category} collection</p>
              </header>
              <Link to="/shop" className="group flex items-center space-x-2 text-rose-pink font-bold">
                <span>View All Shop</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <FlowerCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
