import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTooth, FaSmile, FaSyringe, FaCog, FaTeethOpen, FaStar, FaChild } from 'react-icons/fa';
import { serviceAPI } from '../../services/api';

const iconMap = {
  FaTooth: FaTooth,
  FaSmile: FaSmile,
  FaSyringe: FaSyringe,
  FaCog: FaCog,
  FaTeethOpen: FaTeethOpen,
  FaStar: FaStar,
  FaChild: FaChild,
};

const colorSchemes = [
  { bg: 'bg-primary-50', icon: 'text-primary-600', hover: 'hover:border-primary-200' },
  { bg: 'bg-secondary-50', icon: 'text-secondary-600', hover: 'hover:border-secondary-200' },
  { bg: 'bg-accent-50', icon: 'text-accent-600', hover: 'hover:border-accent-200' },
  { bg: 'bg-purple-50', icon: 'text-purple-600', hover: 'hover:border-purple-200' },
  { bg: 'bg-orange-50', icon: 'text-orange-600', hover: 'hover:border-orange-200' },
  { bg: 'bg-pink-50', icon: 'text-pink-600', hover: 'hover:border-pink-200' },
  { bg: 'bg-teal-50', icon: 'text-teal-600', hover: 'hover:border-teal-200' },
];

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceAPI.getAll();
        setServices(res.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback data
        setServices([
          { _id: '1', name: 'General Dentistry', description: 'Comprehensive dental care including checkups, cleanings, fillings, and preventive treatments.', icon: 'FaTooth', features: ['Regular Checkups', 'Dental Cleanings', 'Cavity Fillings', 'Gum Disease Treatment'] },
          { _id: '2', name: 'Cosmetic Dentistry', description: 'Transform your smile with veneers, bonding, and smile makeovers.', icon: 'FaSmile', features: ['Dental Veneers', 'Tooth Bonding', 'Smile Makeover'] },
          { _id: '3', name: 'Root Canal Treatment', description: 'Pain-free root canal therapy using the latest technology.', icon: 'FaSyringe', features: ['Painless Procedure', 'Advanced Equipment', 'Single Visit Options'] },
          { _id: '4', name: 'Dental Implants', description: 'Permanent tooth replacement with state-of-the-art implants.', icon: 'FaCog', features: ['Titanium Implants', 'Same-Day Implants', 'Full Arch Restoration'] },
          { _id: '5', name: 'Orthodontics', description: 'Straighten teeth with modern braces and clear aligners.', icon: 'FaTeethOpen', features: ['Metal Braces', 'Ceramic Braces', 'Clear Aligners'] },
          { _id: '6', name: 'Teeth Whitening', description: 'Professional whitening for a brighter, more confident smile.', icon: 'FaStar', features: ['In-Office Whitening', 'Take-Home Kits', 'Laser Whitening'] },
          { _id: '7', name: 'Pediatric Dentistry', description: 'Gentle dental care specially designed for children.', icon: 'FaChild', features: ['Child-Friendly', 'Preventive Care', 'Fluoride Treatments'] },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="section-padding bg-gray-50">
        <div className="section-container text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-4" />
            <div className="h-5 bg-gray-200 rounded-lg w-96 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="section-padding bg-gray-50 bg-mesh">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="section-title mt-2">
            Expert <span className="text-gradient">Dental Services</span> Near You
          </h2>
          <p className="section-subtitle">
            From Painless Root Canal Treatment to advanced Dental Implants and Cosmetic Dentistry, our expert team provides comprehensive care for your perfect smile.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || FaTooth;
            const colors = colorSchemes[index % colorSchemes.length];

            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`card p-6 border border-transparent ${colors.hover} group cursor-pointer`}
              >
                <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`text-2xl ${colors.icon}`} />
                </div>
                <h3 className="font-heading font-bold text-dark-900 text-lg mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-1.5">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.bg.replace('50', '500')}`} style={{ backgroundColor: 'currentColor' }} />
                        <span className={colors.icon.replace('text-', 'text-').replace('600', '500')} style={{ color: undefined }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
