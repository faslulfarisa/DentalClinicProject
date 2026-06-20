const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: [true, 'Patient name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
  },
  review: {
    type: String,
    required: [true, 'Review is required'],
    trim: true,
    maxlength: [500, 'Review cannot exceed 500 characters'],
  },
  service: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
