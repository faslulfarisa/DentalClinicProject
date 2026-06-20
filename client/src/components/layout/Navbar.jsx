import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone, FaCalendarAlt } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/#services' },
  { name: 'Doctors', href: '/#doctors' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Contact', href: '/#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleNavClick = (href) => {
    if (href === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.href = '/';
      }
    } else if (href.startsWith('/#')) {
      const id = href.substring(2);
      if (location.pathname === '/') {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = href;
      }
    } else {
      window.location.href = href;
    }
    setIsOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold transition-all duration-300 ${
              scrolled ? 'bg-primary-600 text-white' : 'bg-white text-primary-600'
            }`}>
              B
            </div>
            <div>
              <span className={`text-xl font-heading font-bold transition-colors duration-300 ${
                scrolled ? 'text-dark-900' : 'text-white'
              }`}>
                Bright Smile
              </span>
              <span className={`block text-xs font-medium -mt-1 transition-colors duration-300 ${
                scrolled ? 'text-primary-600' : 'text-primary-200'
              }`}>
                Dental Clinic
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium transition-colors duration-300 hover:text-primary-500 ${
                  scrolled ? 'text-dark-700' : 'text-white/90'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                scrolled
                  ? 'text-primary-600 hover:bg-primary-50'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <FaPhone className="text-xs" />
              Call Now
            </a>
            <Link
              to="/book-appointment"
              className="btn-primary !py-2.5 !px-6 !text-sm"
            >
              <FaCalendarAlt />
              Book Appointment
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-dark-800' : 'text-white'
            }`}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="section-container py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left px-4 py-3 text-dark-800 font-medium hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 px-4 py-3 text-primary-600 font-medium"
                >
                  <FaPhone /> Call: +91 98765 43210
                </a>
                <Link
                  to="/book-appointment"
                  className="btn-primary w-full justify-center !py-3"
                >
                  <FaCalendarAlt />
                  Book Appointment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
