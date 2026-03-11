const Appointment = require('../models/Appointment');
const Lead = require('../models/Lead');
const ApiError = require('../utils/apiError');
const { sendSuccess } = require('../utils/response');

async function listAppointments(_req, res) {
  const appointments = await Appointment.find().populate('leadId').sort({ scheduledFor: 1 });
  return sendSuccess(res, appointments);
}

async function createAppointment(req, res) {
  const { leadId, clientName, artistName, scheduledFor, notes } = req.body;

  if (!scheduledFor) {
    throw new ApiError(400, 'scheduledFor es requerido');
  }

  if (leadId) {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      throw new ApiError(404, 'Lead no encontrado');
    }
  }

  const appointment = await Appointment.create({
    leadId: leadId || undefined,
    clientName,
    artistName,
    scheduledFor,
    notes
  });

  return sendSuccess(res, appointment, 201);
}

module.exports = {
  listAppointments,
  createAppointment
};
