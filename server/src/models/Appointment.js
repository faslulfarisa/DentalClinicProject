const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Patient name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required'],
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred time is required'],
    trim: true,
  },
  service: {
    type: String,
    required: [true, 'Service is required'],
    trim: true,
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
    index: true,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
appointmentSchema.index({ createdAt: -1 });
appointmentSchema.index({ preferredDate: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
