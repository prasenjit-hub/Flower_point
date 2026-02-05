
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../constants';
import FlowerCard from '../components/FlowerCard';
import { Filter, SlidersHorizontal, Search, X } from 'lucide-react';
import { updateMeta } from '../services/seo';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state with URL params
  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    setActiveCategory(cat);

    // Dynamic SEO for Shop
    updateMeta(
      cat === 'All' ? 'Shop All Flower Arrangements' : `${cat} Collection - Flower Point`,
      `Explore our exclusive collection of ${cat === 'All' ? 'premium flowers' : cat}. Same-day delivery available for all hand-tied bouquets.`
    );
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchPrice = true;
      if (priceRange === 'low') matchPrice = p.price < 40;
      else if (priceRange === 'medium') matchPrice = p.price >= 40 && p.price <= 60;
      else if (priceRange === 'high') matchPrice = p.price > 60;

      return matchCategory && matchSearch && matchPrice;
    });
  }, [activeCategory, searchQuery, priceRange]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSearchParams(cat === 'All' ? {} : { category: cat });
  };

  return (
    <div className="pt-28 md:pt-40 pb-16 md:pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <header className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-slate-900">Floral Collection</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">Premium bouquets thoughtfully arranged for every special moment and milestone.</p>
        </header>

        {/* Filters UI */}
        <div className="flex flex-col space-y-4 mb-8">
          <div className="relative w-full">
            <label htmlFor="flower-search" className="sr-only">Search our flower collection</label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              id="flower-search"
              type="text" 
              placeholder="Search bouquets (e.g. Roses, Sunflowers)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-4 bg-white border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-pink shadow-sm text-slate-800 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <nav className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2 no-scrollbar scroll-smooth" aria-label="Product categories">
            <button 
              onClick={() => handleCategoryChange('All')}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === 'All' ? 'bg-rose-pink text-white shadow-md' : 'bg-white border border-slate-100 text-slate-600 hover:border-rose-pink/30'}`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-rose-pink text-white shadow-md' : 'bg-white border border-slate-100 text-slate-600 hover:border-rose-pink/30'}`}
              >
                {cat}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <label htmlFor="price-filter" className="sr-only">Filter by price</label>
              <select 
                id="price-filter"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full pl-10 pr-8 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-pink shadow-sm appearance-none cursor-pointer text-slate-700"
              >
                <option value="all">Filter by Price: All</option>
                <option value="low">Under ₹40</option>
                <option value="medium">₹40 - ₹60</option>
                <option value="high">Over ₹60</option>
              </select>
              <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Filter size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <section aria-label="Search results">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map(product => (
                <FlowerCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-50">
              <Filter size={48} className="mx-auto text-slate-100 mb-4" />
              <h3 className="text-xl font-bold text-slate-800">Nothing matched your search</h3>
              <p className="text-slate-500 mt-2 text-sm">Try broadening your filters or using different keywords.</p>
              <button 
                onClick={() => { setActiveCategory('All'); setPriceRange('all'); setSearchQuery(''); }}
                className="mt-6 text-rose-pink font-bold text-sm bg-rose-pink/5 px-6 py-2 rounded-full hover:bg-rose-pink/10"
              >
                Reset all filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Shop;
