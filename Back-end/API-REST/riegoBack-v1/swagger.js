const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Opciones de configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Sistemas de Irrigación con IoT',
      description: 'Back de sistema de Iriigación con IoT',
      version: '1.0.0',
    },
  },
  apis: ['routes/*.js'], // Ruta a tus archivos de rutas
};

// Generar el documento Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = (app) => {
  // Ruta para mostrar el UI de Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};