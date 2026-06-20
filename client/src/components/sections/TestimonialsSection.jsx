import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { testimonialAPI } from '../../services/api';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await testimonialAPI.getAll();
        setTestimonials(res.data.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([
          { _id: '1', patientName: 'Ananya Mehta', rating: 5, review: 'Absolutely amazing experience! The entire team was so professional and caring.', service: 'Orthodontics' },
          { _id: '2', patientName: 'Vikram Singh', rating: 5, review: 'I was terrified of root canals, but the procedure was completely painless.', service: 'Root Canal' },
          { _id: '3', patientName: 'Meera Joshi', rating: 5, review: 'Got dental implants done here and they look absolutely natural.', service: 'Dental Implants' },
          { _id: '4', patientName: 'Rahul Gupta', rating: 4, review: 'Great teeth whitening results! Very happy with the treatment.', service: 'Teeth Whitening' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const avatarColors = [
    'from-primary-500 to-primary-600',
    'from-secondary-500 to-secondary-600',
    'from-accent-500 to-accent-600',
    'from-purple-500 to-purple-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600',
  ];

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-dark-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-400 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-secondary-400 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading mt-2">
            What Our Patients Say
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mt-4">
            Real stories from real patients. See why they trust us with their smiles.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        {!loading && testimonials.length > 0 && (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-14"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial._id}>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 h-full">
                  <FaQuoteLeft className="text-2xl text-white/20 mb-4" />

                  <p className="text-white/80 leading-relaxed mb-6 text-sm">
                    "{testimonial.review}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-white/20'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Patient Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm`}>
                      {getInitials(testimonial.patientName)}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{testimonial.patientName}</p>
                      {testimonial.service && (
                        <p className="text-white/50 text-xs">{testimonial.service}</p>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
