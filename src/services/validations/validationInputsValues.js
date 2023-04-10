const { validaDisplayName, validaEmail, validaPassword } = require('./schema');
const { Category } = require('../../models');

const validaRegisterUser = (name, email, password) => {
  const validationName = validaDisplayName.validate(name);
  if (validationName.error) {
    return { code: 400, message: '"displayName" length must be at least 8 characters long' };
  }

  const validationEmail = validaEmail.validate(email);
  if (validationEmail.error) {
    return { code: 400, message: '"email" must be a valid email' };
  }

  const validationPassword = validaPassword.validate(password);
  if (validationPassword.error) {
    return { code: 400, message: '"password" length must be at least 6 characters long' };
  }

  return { code: null, message: '' };
};

const verificationCategories = async (categories) => {
  const verfication = await Promise.all(
    categories.map(async (id) => {
      const valueCategories = await Category.findByPk(id);
      return valueCategories !== null;
    }),
  );
  const valida = verfication.every((value) => value === true);
  if (!valida) {
    return { code: 400, message: 'one or more "categoryIds" not found' };
  } 

  return { code: null, message: '' };
};

module.exports = {
  validaRegisterUser,
  verificationCategories,
};