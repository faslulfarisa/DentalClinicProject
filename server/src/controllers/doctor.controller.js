const Doctor = require('../models/Doctor');

// @desc    Get all active doctors (public)
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res, next) => {
  try {
    const { all } = req.query;
    const query = all === 'true' ? {} : { isActive: true };
    const doctors = await Doctor.find(query).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create doctor
// @route   POST /api/doctors
// @access  Private (Admin)
const createDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Doctor added successfully',
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Private (Admin)
const updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor updated successfully',
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private (Admin)
const deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDoctors, createDoctor, updateDoctor, deleteDoctor };
