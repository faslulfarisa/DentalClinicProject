import { FaWhatsapp, FaPhone, FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingCTA = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            id="scroll-to-top-btn"
            className="w-12 h-12 bg-dark-800 hover:bg-dark-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href="tel:+919876543210"
        id="floating-call-btn"
        className="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        title="Call Now"
      >
        <FaPhone size={20} />
      </a>

      <a
        href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment"
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse-soft"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
};

export default FloatingCTA;
