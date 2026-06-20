import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaConciergeBell, FaCheck } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { appointmentAPI, serviceAPI } from '../../services/api';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
  '07:00 PM', '07:30 PM',
];

const AppointmentForm = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    service: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceAPI.getAll();
        setServices(res.data.data);
      } catch {
        setServices([
          { _id: '1', name: 'General Dentistry' },
          { _id: '2', name: 'Cosmetic Dentistry' },
          { _id: '3', name: 'Root Canal Treatment' },
          { _id: '4', name: 'Dental Implants' },
          { _id: '5', name: 'Orthodontics' },
          { _id: '6', name: 'Teeth Whitening' },
          { _id: '7', name: 'Pediatric Dentistry' },
        ]);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await appointmentAPI.create(formData);
      toast.success('Appointment booked successfully! We will contact you shortly.');
      setSubmitted(true);
      setFormData({
        name: '', phone: '', email: '', preferredDate: '', preferredTime: '', service: '', message: '',
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Get tomorrow's date as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (submitted) {
    return (
      <section id="appointment" className="section-padding bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center py-16"
          >
            <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck className="text-3xl text-accent-600" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-dark-900 mb-4">Appointment Request Sent!</h3>
            <p className="text-gray-600 mb-8">
              Thank you for booking with Bright Smile Dental. Our team will contact you shortly to confirm your appointment.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary"
            >
              Book Another Appointment
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment" className="section-padding bg-white">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Book Now</span>
          <h2 className="section-title mt-2">
            Schedule Your{' '}
            <span className="text-gradient">Appointment</span>
          </h2>
          <p className="section-subtitle">
            Book your dental appointment in just a few clicks. We'll confirm within 24 hours.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          id="appointment-form"
          className="max-w-4xl mx-auto bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 md:p-12 shadow-card"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">
                <FaUser className="inline mr-2 text-primary-500" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                id="appointment-name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="input-field"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">
                <FaPhone className="inline mr-2 text-primary-500" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                id="appointment-phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 XXXXX XXXXX"
                className="input-field"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">
                <FaEnvelope className="inline mr-2 text-primary-500" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                id="appointment-email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="input-field"
              />
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">
                <FaConciergeBell className="inline mr-2 text-primary-500" />
                Service *
              </label>
              <select
                name="service"
                id="appointment-service"
                value={formData.service}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service._id} value={service.name}>{service.name}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">
                <FaCalendarAlt className="inline mr-2 text-primary-500" />
                Preferred Date *
              </label>
              <input
                type="date"
                name="preferredDate"
                id="appointment-date"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                min={minDate}
                className="input-field"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">
                <FaClock className="inline mr-2 text-primary-500" />
                Preferred Time *
              </label>
              <select
                name="preferredTime"
                id="appointment-time"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-dark-800 mb-2">
                Message (Optional)
              </label>
              <textarea
                name="message"
                id="appointment-message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                placeholder="Tell us about your dental concern..."
                className="input-field resize-none"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              id="appointment-submit-btn"
              disabled={loading}
              className={`btn-primary !py-4 !px-12 text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Booking...
                </>
              ) : (
                <>
                  <FaCalendarAlt />
                  Book Appointment
                </>
              )}
            </button>
            <p className="text-sm text-gray-500 mt-4">
              We'll confirm your appointment within 24 hours
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default AppointmentForm;
