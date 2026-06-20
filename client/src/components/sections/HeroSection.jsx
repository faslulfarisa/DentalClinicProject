import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaPhone, FaWhatsapp, FaCheckCircle, FaUserMd, FaStar, FaAward } from 'react-icons/fa';

const trustIndicators = [
  { icon: FaAward, value: '15+', label: 'Years Experience' },
  { icon: FaUserMd, value: '10K+', label: 'Happy Patients' },
  { icon: FaStar, value: '4.9', label: 'Star Rating' },
  { icon: FaCheckCircle, value: '25K+', label: 'Treatments Done' },
];

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-400 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent-400 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }} />

      <div className="section-container relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6 border border-white/20">
              <FaCheckCircle className="text-accent-400" />
              Trusted by 10,000+ Patients
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
              The Best Dental Clinic for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-accent-300">
                Your Family
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed">
              Looking for a dentist near me? Experience world-class care with your trusted family dentist. From routine checkups to cosmetic dentistry, your perfect smile starts here.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/book-appointment"
                id="hero-book-appointment-btn"
                className="bg-white text-primary-700 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2 text-base"
              >
                <FaCalendarAlt />
                Book Appointment
              </Link>
              <a
                href="tel:+919876543210"
                id="hero-call-btn"
                className="bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-2"
              >
                <FaPhone />
                Call Now
              </a>
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="bg-green-500 text-white font-semibold py-4 px-8 rounded-xl hover:bg-green-600 shadow-lg transition-all duration-300 inline-flex items-center gap-2"
              >
                <FaWhatsapp size={20} />
                WhatsApp
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustIndicators.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
                >
                  <item.icon className="text-secondary-300 mx-auto mb-1 text-lg" />
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <p className="text-white/60 text-xs">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image / Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img src="/images/hero.png" alt="Best Dental Clinic Near Me - Modern Interior" className="w-full h-full object-cover" fetchpriority="high" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-accent-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-dark-900">Appointment Confirmed</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4"
              >
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-dark-900">4.9/5 Rating</p>
                <p className="text-xs text-gray-500">Based on 500+ reviews</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
