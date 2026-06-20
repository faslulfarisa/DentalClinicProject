require('dotenv').config();
const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');

const updateImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dental-clinic');
    console.log('Connected to DB');

    const doctors = await Doctor.find().sort({ order: 1 });
    
    if (doctors.length >= 4) {
      await Doctor.findByIdAndUpdate(doctors[0]._id, { image: '/images/doc1.png' });
      await Doctor.findByIdAndUpdate(doctors[1]._id, { image: '/images/doc2.png' });
      await Doctor.findByIdAndUpdate(doctors[2]._id, { image: '/images/doc3.png' });
      await Doctor.findByIdAndUpdate(doctors[3]._id, { image: '/images/doc4.png' });
      console.log('Updated the first 4 doctors with images!');
    } else {
      console.log('Not enough doctors found.');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error updating images:', err);
    process.exit(1);
  }
};

updateImages();
