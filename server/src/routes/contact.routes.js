const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries, updateInquiry, deleteInquiry } = require('../controllers/contact.controller');
const { protect } = require('../middleware/auth');
const { formSubmission } = require('../middleware/rateLimiter');

router.post('/', formSubmission, createInquiry);
router.get('/', protect, getInquiries);
router.put('/:id', protect, updateInquiry);
router.delete('/:id', protect, deleteInquiry);

module.exports = router;
