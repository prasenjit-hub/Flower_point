
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingCart, Zap, Share2, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FlowerCardProps {
  product: Product;
}

const FlowerCard: React.FC<FlowerCardProps> = memo(({ product }) => {
  const { addToCart, setDirectBuyItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDirectBuyItem({ ...product, quantity: 1 });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareData = {
      title: `Flower Point - ${product.name}`,
      text: `Take a look at this stunning "${product.name}" arrangement from Flower Point!`,
      url: `${window.location.origin}${window.location.pathname}#/product/${product.id}`,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-50 flex flex-col h-full">
      {/* Link the Image area to details */}
      <Link to={`/product/${product.id}`} className="relative h-64 md:h-72 overflow-hidden block">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <ArrowUpRight className="text-white" size={24} />
          </div>
        </div>
        
        {/* Category Tag */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-rose-pink px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
          {product.category}
        </div>

        {/* Share Button */}
        <button 
          onClick={handleShare}
          className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md text-slate-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-rose-pink shadow-sm"
          aria-label="Share"
        >
          <Share2 size={16} />
        </button>
      </Link>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 bg-white">
        <Link to={`/product/${product.id}`} className="mb-4 block hover:opacity-80 transition-opacity">
          <h3 className="text-xl font-bold text-slate-800 mb-1 leading-tight group-hover:text-rose-pink transition-colors">
            {product.name}
          </h3>
          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </Link>

        <div className="mt-auto pt-4 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              ₹{product.price.toFixed(2)}
            </span>
            <div className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">
              <Zap size={12} className="mr-1 fill-emerald-500" />
              In Stock
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-5 gap-2">
            <button 
              onClick={handleAddToCart}
              className="col-span-2 flex items-center justify-center h-12 bg-slate-50 text-slate-700 rounded-2xl transition-all hover:bg-rose-pink/10 hover:text-rose-pink active:scale-95 border border-slate-100"
              title="Add to Basket"
            >
              <ShoppingCart size={18} className="mr-2" />
              <span className="text-xs font-bold uppercase tracking-wide">Add</span>
            </button>
            <button 
              onClick={handleBuyNow}
              className="col-span-3 flex items-center justify-center h-12 bg-rose-pink text-white rounded-2xl transition-all shadow-lg shadow-rose-pink/20 hover:bg-rose-pink/90 active:scale-95 font-bold"
            >
              <span className="text-xs font-bold uppercase tracking-widest mr-2">Buy Now</span>
              <Zap size={14} className="fill-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FlowerCard;
