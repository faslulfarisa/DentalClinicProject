import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-gray-300">
      {/* Main Footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Clinic Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                B
              </div>
              <div>
                <span className="text-xl font-heading font-bold text-white">Bright Smile</span>
                <span className="block text-xs text-primary-400 -mt-1">Dental Clinic</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Your trusted dental care partner providing comprehensive dental services
              with modern technology and experienced professionals.
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Our Services', 'Our Doctors', 'Testimonials', 'Contact Us'].map((link) => (
                <li key={link}>
                  <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-5">Our Services</h3>
            <ul className="space-y-3">
              {['General Dentistry', 'Cosmetic Dentistry', 'Root Canal Treatment', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Pediatric Dentistry'].map((service) => (
                <li key={service}>
                  <Link to="/#services" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-5">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary-400 mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm">123 Smile Avenue, Health District, Mumbai, Maharashtra 400001</p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-primary-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary-400 flex-shrink-0" />
                <a href="mailto:info@brightsmile.com" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  info@brightsmile.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FaClock className="text-primary-400 mt-1 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p>Sunday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-800">
        <div className="section-container py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-sm">
              © {currentYear} Bright Smile Dental Clinic. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
