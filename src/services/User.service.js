const { User } = require('../models');
const { makeToken } = require('../auth/jwt');
const { validaRegisterUser } = require('./validations/validationInputsValues');

const loginServise = async (emailLogin, password) => {
  const user = await User.findOne({
    where: {
      email: emailLogin,
      password,
    },
  });

  if (!user) {
    throw Object.assign(
      new Error('Invalid fields'),
      { code: 400 },
   );
  }

  const { id, displayName, email, image } = user.dataValues;
  const payload = { id, displayName, email, image };

  return makeToken(payload);
};

const registerUser = async (displayName, email, password, image) => {
  const { code, message } = validaRegisterUser(displayName, email, password);
  if (code) {
    throw Object.assign(
      new Error(message),
      { code },
   );
  }

  const userExist = await User.findAll({
    where: { email },
  });

  if (userExist.length) {
    throw Object.assign(
      new Error('User already registered'),
      { code: 409 },
   );
  }
  await User.create({ displayName, email, password, image });
  // console.log(newUser.null);

  return makeToken({ displayName, email, image });
};

const findAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const findById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    throw Object.assign(
      new Error('User does not exist'),
      { code: 404 },
   );
  }

  return user;
};

module.exports = {
  loginServise,
  registerUser,
  findAllUsers,
  findById,
};