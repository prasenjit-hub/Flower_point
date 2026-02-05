
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import { CartProvider, useCart } from './context/CartContext';
import { DELIVERY_FEE } from './constants';

// Scroll to top on route change for better UX
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global Modals Controller for direct purchases
const GlobalModals = () => {
  const { directBuyItem, setDirectBuyItem } = useCart();
  
  return (
    <CheckoutModal 
      isOpen={!!directBuyItem}
      onClose={() => setDirectBuyItem(null)}
      cart={directBuyItem ? [directBuyItem] : []}
      total={directBuyItem ? directBuyItem.price + DELIVERY_FEE : 0}
      clearCart={() => {}}
      isDirectBuy={true}
    />
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          {/* WhatsApp Button replaces the AI Chatbot */}
          <WhatsAppButton />
          <CartDrawer />
          <GlobalModals />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
