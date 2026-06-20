const express = require('express');
const router = express.Router();
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctor.controller');
const { protect } = require('../middleware/auth');

router.get('/', getDoctors);
router.post('/', protect, createDoctor);
router.put('/:id', protect, updateDoctor);
router.delete('/:id', protect, deleteDoctor);

module.exports = router;
