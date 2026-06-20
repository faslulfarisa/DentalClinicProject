const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const Appointment = require('../models/Appointment');

const { mongoUri } = require('../config/env');

const seedData = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    await FAQ.deleteMany({});
    await Appointment.deleteMany({});

    console.log('Cleared existing data');

    // Seed Admin User
    await User.create({
      name: 'Admin',
      email: 'admin@brightsmile.com',
      password: 'Admin@123',
      role: 'admin',
    });
    console.log('✅ Admin user created (admin@brightsmile.com / Admin@123)');

    // Seed Services
    const services = await Service.insertMany([
      {
        name: 'General Dentistry',
        description: 'Comprehensive dental care including checkups, cleanings, fillings, and preventive treatments to maintain your oral health.',
        icon: 'FaTooth',
        features: ['Regular Checkups', 'Dental Cleanings', 'Cavity Fillings', 'Gum Disease Treatment'],
        order: 1,
      },
      {
        name: 'Cosmetic Dentistry',
        description: 'Transform your smile with our advanced cosmetic procedures including veneers, bonding, and smile makeovers.',
        icon: 'FaSmile',
        features: ['Dental Veneers', 'Tooth Bonding', 'Smile Makeover', 'Gum Contouring'],
        order: 2,
      },
      {
        name: 'Root Canal Treatment',
        description: 'Pain-free root canal therapy using the latest technology to save your natural teeth and relieve dental pain.',
        icon: 'FaSyringe',
        features: ['Painless Procedure', 'Advanced Equipment', 'Single Visit Options', 'Crown Restoration'],
        order: 3,
      },
      {
        name: 'Dental Implants',
        description: 'Permanent tooth replacement solutions with state-of-the-art dental implants for a natural-looking smile.',
        icon: 'FaCog',
        features: ['Titanium Implants', 'Same-Day Implants', 'Full Arch Restoration', 'Bone Grafting'],
        order: 4,
      },
      {
        name: 'Orthodontics',
        description: 'Straighten your teeth with modern braces and clear aligners for a perfectly aligned smile.',
        icon: 'FaTeethOpen',
        features: ['Metal Braces', 'Ceramic Braces', 'Clear Aligners', 'Retainers'],
        order: 5,
      },
      {
        name: 'Teeth Whitening',
        description: 'Professional teeth whitening treatments for a brighter, more confident smile in just one visit.',
        icon: 'FaStar',
        features: ['In-Office Whitening', 'Take-Home Kits', 'Laser Whitening', 'Long-Lasting Results'],
        order: 6,
      },
      {
        name: 'Pediatric Dentistry',
        description: 'Gentle and fun dental care specially designed for children of all ages in a friendly environment.',
        icon: 'FaChild',
        features: ['Child-Friendly Environment', 'Preventive Care', 'Fluoride Treatments', 'Dental Sealants'],
        order: 7,
      },
    ]);
    console.log(`✅ ${services.length} services created`);

    // Seed Doctors
    const doctors = await Doctor.insertMany([
      {
        name: 'Dr. Rajesh Kumar',
        qualification: 'BDS, MDS (Orthodontics)',
        experience: 15,
        specialization: 'Orthodontics & Smile Design',
        bio: 'Dr. Rajesh Kumar is a leading orthodontist with 15+ years of experience in smile design and teeth alignment using the latest techniques.',
        image: '',
        order: 1,
      },
      {
        name: 'Dr. Priya Sharma',
        qualification: 'BDS, MDS (Endodontics)',
        experience: 12,
        specialization: 'Root Canal & Endodontics',
        bio: 'Dr. Priya Sharma specializes in painless root canal treatments and has successfully treated over 5,000 patients.',
        image: '',
        order: 2,
      },
      {
        name: 'Dr. Amit Patel',
        qualification: 'BDS, MDS (Prosthodontics)',
        experience: 10,
        specialization: 'Dental Implants & Crowns',
        bio: 'Dr. Amit Patel is an expert in dental implants and prosthetic dentistry, restoring smiles with precision and care.',
        image: '',
        order: 3,
      },
      {
        name: 'Dr. Sneha Reddy',
        qualification: 'BDS, MDS (Pediatric Dentistry)',
        experience: 8,
        specialization: 'Pediatric & Preventive Dentistry',
        bio: 'Dr. Sneha Reddy creates a fun and comfortable environment for children, making dental visits an enjoyable experience.',
        image: '',
        order: 4,
      },
    ]);
    console.log(`✅ ${doctors.length} doctors created`);

    // Seed Testimonials
    const testimonials = await Testimonial.insertMany([
      {
        patientName: 'Ananya Mehta',
        rating: 5,
        review: 'Absolutely amazing experience! Dr. Rajesh transformed my smile with braces. The entire team was so professional and caring. Highly recommend Bright Smile Dental!',
        service: 'Orthodontics',
      },
      {
        patientName: 'Vikram Singh',
        rating: 5,
        review: 'I was terrified of root canals, but Dr. Priya made it completely painless. The procedure was quick and I felt no discomfort at all. Thank you!',
        service: 'Root Canal Treatment',
      },
      {
        patientName: 'Meera Joshi',
        rating: 5,
        review: 'Got dental implants done here and they look absolutely natural. Dr. Amit is truly skilled. The clinic is very clean and modern.',
        service: 'Dental Implants',
      },
      {
        patientName: 'Rahul Gupta',
        rating: 4,
        review: 'Great teeth whitening results! My teeth are several shades whiter and the effect has lasted. Very happy with the treatment.',
        service: 'Teeth Whitening',
      },
      {
        patientName: 'Sunita Devi',
        rating: 5,
        review: 'My kids love coming to see Dr. Sneha. She is so patient and gentle with children. The best pediatric dentist we have found!',
        service: 'Pediatric Dentistry',
      },
      {
        patientName: 'Arjun Nair',
        rating: 5,
        review: 'Professional service from start to finish. The clinic uses the latest technology and the staff is very friendly. My go-to dental clinic!',
        service: 'General Dentistry',
      },
      {
        patientName: 'Deepika Rao',
        rating: 4,
        review: 'Had a wonderful cosmetic dentistry experience. My veneers look perfect and natural. Dr. Rajesh really knows his craft.',
        service: 'Cosmetic Dentistry',
      },
      {
        patientName: 'Karthik Menon',
        rating: 5,
        review: 'Been visiting Bright Smile for years now. Consistent quality, affordable prices, and genuinely caring doctors. Cannot ask for more!',
        service: 'General Dentistry',
      },
    ]);
    console.log(`✅ ${testimonials.length} testimonials created`);

    // Seed FAQs
    const faqs = await FAQ.insertMany([
      {
        question: 'How often should I visit the dentist?',
        answer: 'We recommend visiting the dentist every 6 months for regular checkups and cleanings. However, if you have specific dental issues, more frequent visits may be necessary.',
        category: 'General',
        order: 1,
      },
      {
        question: 'Is the root canal treatment painful?',
        answer: 'Modern root canal treatments are virtually painless. We use advanced anesthesia and the latest technology to ensure your comfort throughout the procedure.',
        category: 'Treatment',
        order: 2,
      },
      {
        question: 'How long do dental implants last?',
        answer: 'With proper care and maintenance, dental implants can last a lifetime. They are the most durable and long-lasting tooth replacement option available.',
        category: 'Treatment',
        order: 3,
      },
      {
        question: 'Do you offer payment plans?',
        answer: 'Yes, we offer flexible payment plans and accept most insurance providers. We believe quality dental care should be accessible to everyone.',
        category: 'Payment',
        order: 4,
      },
      {
        question: 'What should I do in a dental emergency?',
        answer: 'Call us immediately at our emergency line. We offer same-day emergency appointments for urgent dental issues like severe pain, broken teeth, or knocked-out teeth.',
        category: 'Emergency',
        order: 5,
      },
      {
        question: 'How long does teeth whitening last?',
        answer: 'Professional teeth whitening results typically last 6-12 months depending on your diet and oral hygiene habits. We also provide take-home kits for maintenance.',
        category: 'Treatment',
        order: 6,
      },
      {
        question: 'At what age should children first visit the dentist?',
        answer: 'We recommend bringing your child for their first dental visit by their first birthday or when their first tooth appears. Early visits help establish good oral health habits.',
        category: 'Pediatric',
        order: 7,
      },
      {
        question: 'What are your working hours?',
        answer: 'We are open Monday to Saturday from 9:00 AM to 8:00 PM, and Sundays from 10:00 AM to 2:00 PM. We also offer emergency services outside regular hours.',
        category: 'General',
        order: 8,
      },
      {
        question: 'Do you use the latest dental technology?',
        answer: 'Yes! We invest in the latest dental equipment including digital X-rays, intraoral cameras, laser dentistry, and CAD/CAM technology for precise treatments.',
        category: 'General',
        order: 9,
      },
      {
        question: 'How can I book an appointment?',
        answer: 'You can book an appointment through our website, call us directly, or send us a WhatsApp message. We also accept walk-in patients based on availability.',
        category: 'General',
        order: 10,
      },
    ]);
    console.log(`✅ ${faqs.length} FAQs created`);

    // Seed Sample Appointments
    const appointments = await Appointment.insertMany([
      {
        name: 'Test Patient 1',
        phone: '+91 9876543210',
        email: 'patient1@example.com',
        preferredDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        preferredTime: '10:00 AM',
        service: 'General Dentistry',
        message: 'Regular checkup needed',
        status: 'pending',
      },
      {
        name: 'Test Patient 2',
        phone: '+91 9876543211',
        email: 'patient2@example.com',
        preferredDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        preferredTime: '2:00 PM',
        service: 'Root Canal Treatment',
        message: 'Tooth pain for last 3 days',
        status: 'confirmed',
      },
      {
        name: 'Test Patient 3',
        phone: '+91 9876543212',
        email: 'patient3@example.com',
        preferredDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        preferredTime: '11:00 AM',
        service: 'Teeth Whitening',
        message: 'Want brighter smile',
        status: 'completed',
      },
    ]);
    console.log(`✅ ${appointments.length} sample appointments created`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('Admin Login: admin@brightsmile.com / Admin@123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedData();
