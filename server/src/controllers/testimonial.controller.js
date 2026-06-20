const Testimonial = require('../models/Testimonial');

// @desc    Get all active testimonials (public)
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res, next) => {
  try {
    const { all } = req.query;
    const query = all === 'true' ? {} : { isActive: true };
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Private (Admin)
const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Testimonial added successfully',
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private (Admin)
const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin)
const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
