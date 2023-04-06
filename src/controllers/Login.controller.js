const { loginServise } = require('../services/userLogin.service');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const performLogin = await loginServise(email, password);

    return res.status(200).json({ token: performLogin });
  } catch (error) {
    console.log(error);
    if (error.code) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Error Internal' }); 
  }
};

module.exports = { 
  login,
};