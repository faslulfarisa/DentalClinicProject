const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getStats,
} = require('../controllers/appointment.controller');
const { protect } = require('../middleware/auth');
const { formSubmission } = require('../middleware/rateLimiter');

// Public route (rate limited)
router.post('/', formSubmission, createAppointment);

// Protected routes
router.get('/stats', protect, getStats);
router.get('/', protect, getAppointments);
router.get('/:id', protect, getAppointment);
router.put('/:id', protect, updateAppointment);
router.delete('/:id', protect, deleteAppointment);

module.exports = router;
