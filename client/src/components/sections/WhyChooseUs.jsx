import { motion } from 'framer-motion';
import { FaUserMd, FaMicrochip, FaMoneyBillWave, FaShieldAlt, FaHeart, FaClock } from 'react-icons/fa';

const features = [
  {
    icon: FaUserMd,
    title: 'Experienced Dentists',
    description: 'Board-certified dentists with 10+ years of specialized experience in various dental fields.',
    color: 'primary',
  },
  {
    icon: FaMicrochip,
    title: 'Modern Technology',
    description: 'State-of-the-art equipment including digital X-rays, lasers, and CAD/CAM technology.',
    color: 'secondary',
  },
  {
    icon: FaMoneyBillWave,
    title: 'Affordable Pricing',
    description: 'Quality dental care at transparent and competitive prices with flexible payment options.',
    color: 'accent',
  },
  {
    icon: FaShieldAlt,
    title: 'Hygienic Environment',
    description: 'Strict sterilization protocols and a clean, comfortable clinic environment.',
    color: 'primary',
  },
  {
    icon: FaHeart,
    title: 'Patient-Focused Care',
    description: 'Personalized treatment plans and compassionate care for every patient.',
    color: 'secondary',
  },
  {
    icon: FaClock,
    title: 'Convenient Hours',
    description: 'Open 6 days a week with extended hours and emergency appointment availability.',
    color: 'accent',
  },
];

const colorConfig = {
  primary: { bg: 'bg-primary-50', icon: 'text-primary-600', border: 'border-primary-100' },
  secondary: { bg: 'bg-secondary-50', icon: 'text-secondary-600', border: 'border-secondary-100' },
  accent: { bg: 'bg-accent-50', icon: 'text-accent-600', border: 'border-accent-100' },
};

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="section-padding bg-gray-50 bg-mesh">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="section-title mt-2">
            The{' '}
            <span className="text-gradient">Bright Smile</span>{' '}
            Difference
          </h2>
          <p className="section-subtitle">
            Discover what sets us apart and why thousands of patients trust us
            with their smiles.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colors = colorConfig[feature.color];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-8 border ${colors.border} hover:shadow-card-hover transition-all duration-300 group`}
              >
                <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`text-2xl ${colors.icon}`} />
                </div>
                <h3 className="font-heading font-bold text-dark-900 text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
