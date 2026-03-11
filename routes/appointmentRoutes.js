const express = require('express');
const { listAppointments, createAppointment } = require('../controllers/appointmentController');
const { requireAuth, requireAdmin } = require('../middlewares/auth');

const router = express.Router();

router.use(requireAuth, requireAdmin);

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     tags: [Appointments]
 *     summary: Listar citas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de citas
 *   post:
 *     tags: [Appointments]
 *     summary: Crear cita
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAppointmentRequest'
 *     responses:
 *       201:
 *         description: Cita creada
 */
router.get('/', listAppointments);
router.post('/', createAppointment);

module.exports = router;
