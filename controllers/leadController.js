const Lead = require('../models/Lead');
const ApiError = require('../utils/apiError');
const { sendSuccess } = require('../utils/response');

async function createPublicLead(req, res) {
  const { firstName, lastName, email, phone, city, idea } = req.body;

  if (!firstName || !lastName) {
    throw new ApiError(400, 'firstName y lastName son requeridos');
  }

  if (!email && !phone) {
    throw new ApiError(400, 'email o phone es requerido');
  }

  const lead = await Lead.create({
    firstName,
    lastName,
    email,
    phone,
    city,
    idea
  });

  return sendSuccess(res, lead, 201);
}

async function listLeads(_req, res) {
  const leads = await Lead.find().sort({ createdAt: -1 });
  return sendSuccess(res, leads);
}

async function updateLead(req, res) {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    throw new ApiError(404, 'Lead no encontrado');
  }

  if (req.body.status) {
    lead.status = req.body.status;
  }

  if (typeof req.body.notes === 'string') {
    lead.notes = req.body.notes;
  }

  await lead.save();
  return sendSuccess(res, lead);
}

module.exports = {
  createPublicLead,
  listLeads,
  updateLead
};
