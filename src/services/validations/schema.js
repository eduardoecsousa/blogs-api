const Joi = require('joi');

const validaDisplayName = Joi.string().min(8);

const validaEmail = Joi.string().email();

const validaPassword = Joi.string().min(6);

module.exports = {
  validaDisplayName,
  validaEmail,
  validaPassword,
};
