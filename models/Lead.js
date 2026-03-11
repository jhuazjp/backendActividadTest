const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    city: { type: String, trim: true },
    idea: { type: String, trim: true },
    notes: { type: String, trim: true },
    status: { type: String, enum: ['NEW', 'CONTACTED', 'BOOKED'], default: 'NEW' }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
