const ContactInquiry = require('../models/ContactInquiry');

// @desc    Submit contact inquiry (public)
// @route   POST /api/contact
// @access  Public
const createInquiry = async (req, res, next) => {
  try {
    const inquiry = await ContactInquiry.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries
// @route   GET /api/contact
// @access  Private (Admin)
const getInquiries = async (req, res, next) => {
  try {
    const { isRead, page = 1, limit = 10 } = req.query;
    const query = {};

    if (isRead !== undefined) query.isRead = isRead === 'true';

    const total = await ContactInquiry.countDocuments(query);
    const inquiries = await ContactInquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const unreadCount = await ContactInquiry.countDocuments({ isRead: false });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      total,
      unreadCount,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark inquiry as read
// @route   PUT /api/contact/:id
// @access  Private (Admin)
const updateInquiry = async (req, res, next) => {
  try {
    const inquiry = await ContactInquiry.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry marked as read',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await ContactInquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createInquiry, getInquiries, updateInquiry, deleteInquiry };
