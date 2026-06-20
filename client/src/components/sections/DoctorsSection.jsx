import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaBriefcaseMedical, FaGraduationCap, FaStar } from 'react-icons/fa';
import { doctorAPI } from '../../services/api';

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await doctorAPI.getAll();
        setDoctors(res.data.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([
          { _id: '1', name: 'Dr. Rajesh Kumar', qualification: 'BDS, MDS (Orthodontics)', experience: 15, specialization: 'Orthodontics & Smile Design' },
          { _id: '2', name: 'Dr. Priya Sharma', qualification: 'BDS, MDS (Endodontics)', experience: 12, specialization: 'Root Canal & Endodontics' },
          { _id: '3', name: 'Dr. Amit Patel', qualification: 'BDS, MDS (Prosthodontics)', experience: 10, specialization: 'Dental Implants & Crowns' },
          { _id: '4', name: 'Dr. Sneha Reddy', qualification: 'BDS, MDS (Pediatric Dentistry)', experience: 8, specialization: 'Pediatric & Preventive Dentistry' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <section id="doctors" className="section-padding bg-white">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Top Rated Family Dentists</span>
          <h2 className="section-title mt-2">
            Meet Our Expert{' '}
            <span className="text-gradient">Dental Specialists</span>
          </h2>
          <p className="section-subtitle">
            Our team of board-certified dentists brings decades of combined experience
            to provide you with the highest quality dental care.
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card overflow-hidden group"
            >
              {/* Doctor Image / Avatar */}
              <div className="relative h-56 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center overflow-hidden">
                {doctor.image ? (
                  <img src={doctor.image} alt={`${doctor.name} - Expert Dentist`} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform duration-500">
                      <FaUserMd className="text-4xl text-primary-600" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
              </div>

              {/* Doctor Info */}
              <div className="p-6 -mt-4 relative">
                <h3 className="font-heading font-bold text-dark-900 text-lg">{doctor.name}</h3>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                  <FaGraduationCap className="text-primary-500 flex-shrink-0" />
                  <span>{doctor.qualification}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1.5">
                  <FaBriefcaseMedical className="text-secondary-500 flex-shrink-0" />
                  <span>{doctor.experience}+ Years Experience</span>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">
                    {doctor.specialization}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
