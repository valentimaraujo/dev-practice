const Joi = require('joi');

const schemas = {
  create: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().valid('analise clinica', 'imagem').required(),
    active: Joi.boolean().optional(),
  }),

  update: Joi.object().keys({
    name: Joi.string().optional(),
    type: Joi.string().valid('analise clinica', 'imagem').optional(),
    active: Joi.boolean().optional(),
  }),
};

module.exports = schemas;
