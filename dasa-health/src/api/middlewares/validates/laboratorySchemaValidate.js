const Joi = require('joi');

const schemas = {
  create: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    active: Joi.boolean().optional(),
  }),

  update: Joi.object().keys({
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    active: Joi.boolean().optional(),
  }),
};

module.exports = schemas;
