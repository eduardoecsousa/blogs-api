const userService = require('../services/User.service');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const performLogin = await userService.loginServise(email, password);

    return res.status(200).json({ token: performLogin });
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Error Internal' }); 
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await userService.registerUser(displayName, email, password, image);

    return res.status(201).json({ token: newUser });
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
  createUser,
};