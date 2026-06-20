import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaDirections } from 'react-icons/fa';

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: 'Visit Us',
    details: ['123 Smile Avenue, Health District', 'Mumbai, Maharashtra 400001'],
    color: 'primary',
  },
  {
    icon: FaPhone,
    title: 'Call Us',
    details: ['+91 98765 43210', '+91 98765 43211'],
    link: 'tel:+919876543210',
    color: 'secondary',
  },
  {
    icon: FaEnvelope,
    title: 'Email Us',
    details: ['info@brightsmile.com', 'appointments@brightsmile.com'],
    link: 'mailto:info@brightsmile.com',
    color: 'accent',
  },
  {
    icon: FaClock,
    title: 'Working Hours',
    details: ['Mon - Sat: 9:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 2:00 PM'],
    color: 'primary',
  },
];

const colorConfig = {
  primary: { bg: 'bg-primary-50', icon: 'text-primary-600' },
  secondary: { bg: 'bg-secondary-50', icon: 'text-secondary-600' },
  accent: { bg: 'bg-accent-50', icon: 'text-accent-600' },
};

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          <h2 className="section-title mt-2">
            Get In{' '}
            <span className="text-gradient">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have questions or ready to schedule your visit? Reach out to us today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {contactInfo.map((info, index) => {
              const colors = colorConfig[info.color];
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <info.icon className={`text-xl ${colors.icon}`} />
                  </div>
                  <h3 className="font-heading font-bold text-dark-900 mb-2">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 text-sm">
                      {info.link ? (
                        <a href={info.link} className="hover:text-primary-600 transition-colors">{detail}</a>
                      ) : (
                        detail
                      )}
                    </p>
                  ))}
                </motion.div>
              );
            })}
          </div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-card h-[400px] lg:h-full min-h-[350px]"
          >
            <iframe
              title="Bright Smile Dental Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5!2d72.8777!3d19.076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNTInMzkuNyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
