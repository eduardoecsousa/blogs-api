const { User } = require('../models');
const { makeToken } = require('../auth/jwt');

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

module.exports = {
  loginServise,
};