const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
    clientName: { type: String, trim: true },
    artistName: { type: String, trim: true },
    scheduledFor: { type: Date, required: true },
    notes: { type: String, trim: true },
    status: { type: String, enum: ['PENDING', 'CONFIRMED', 'DONE'], default: 'PENDING' }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
