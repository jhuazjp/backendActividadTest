const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const port = Number(process.env.PORT) || 3000;
const apiBaseUrl = process.env.API_BASE_URL || `http://localhost:${port}`;

module.exports = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'ProyectoFinalLite API',
      version: '1.0.0',
      description: 'Documentacion corta para un MVP de bootcamp.'
    },
    servers: [{ url: apiBaseUrl }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        LoginRequest: {
          type: 'object',
          required: ['emailOrPhone', 'password'],
          properties: {
            emailOrPhone: { type: 'string' },
            password: { type: 'string' }
          }
        },
        CreateUserRequest: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password', 'role'],
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'string', enum: ['ADMIN', 'ARTIST', 'CLIENT'] }
          }
        },
        PublicLeadRequest: {
          type: 'object',
          required: ['firstName', 'lastName'],
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            city: { type: 'string' },
            idea: { type: 'string' }
          }
        },
        UpdateLeadRequest: {
          type: 'object',
          properties: {
            status: { type: 'string', enum: ['NEW', 'CONTACTED', 'BOOKED'] },
            notes: { type: 'string' }
          }
        },
        CreateAppointmentRequest: {
          type: 'object',
          required: ['scheduledFor'],
          properties: {
            leadId: { type: 'string' },
            clientName: { type: 'string' },
            artistName: { type: 'string' },
            scheduledFor: { type: 'string', format: 'date-time' },
            notes: { type: 'string' }
          }
        }
      }
    }
  },
  apis: [path.join(__dirname, 'routes/*.js').replace(/\\/g, '/')]
});
