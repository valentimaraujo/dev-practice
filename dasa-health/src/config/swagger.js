const { resolve } = require('path');

module.exports = {
  swaggerDefinition: {
    info: {
      title: 'Dasa Health API',
      description: 'API para manutenção de laboratórios e exames.',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Valentim Araújo',
        email: 'valentim_araujo@yahoo.com.br',
      },
    },
  },
  servers: [{ url: 'http://localhost:3001/api/v1' }],
  apis: [`${resolve(__dirname)}/../routes/*.js`],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      schema: 'bearer',
      in: 'header',
    },
  },
};
