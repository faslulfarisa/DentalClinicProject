import { motion } from 'framer-motion';
import { FaHeartbeat, FaEye, FaHandHoldingMedical, FaUsers } from 'react-icons/fa';

const stats = [
  { value: '15+', label: 'Years of Experience' },
  { value: '10,000+', label: 'Happy Patients' },
  { value: '25,000+', label: 'Treatments Done' },
  { value: '4', label: 'Expert Dentists' },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="/images/about.png" alt="Best Dentist Near Me - Our Expert Dental Team" className="w-full h-full object-cover aspect-[4/3]" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent flex items-end p-8">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
                  <h4 className="font-heading font-bold text-dark-900 text-lg mb-1">Our Mission</h4>
                  <p className="text-gray-600 text-sm">To provide exceptional dental care accessible to everyone.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="section-title mt-2 mb-6">
              Why Patients{' '}
              <span className="text-gradient">Trust Us</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Bright Smile Dental Clinic, we believe every smile tells a story. With over 15 years
              of experience, our team of dedicated dental professionals has been transforming smiles
              and improving lives through comprehensive dental care.
            </p>

            <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mb-6 rounded-r-lg">
              <p className="italic text-primary-900 font-medium">"Our philosophy is simple: we treat every patient like family, providing the highest standard of Cosmetic Dentistry and Painless Root Canal Treatments using state-of-the-art technology."</p>
              <p className="text-primary-700 text-sm mt-2 font-bold">— Dr. Rajesh Kumar, Lead Dentist</p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              We combine cutting-edge technology with a warm, patient-centered approach to deliver
              treatments that exceed expectations. From routine checkups to complex procedures,
              we ensure every visit is comfortable, efficient, and results-driven.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-gray-50"
                >
                  <p className="text-2xl md:text-3xl font-bold text-primary-600 font-heading">{stat.value}</p>
                  <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
