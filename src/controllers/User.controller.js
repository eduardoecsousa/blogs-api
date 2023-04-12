const userService = require('../services/User.service');

const errorInternal = require('./utils');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const performLogin = await userService.loginServise(email, password);

    return res.status(200).json({ token: performLogin });
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(errorInternal[0]).json({ message: errorInternal[1] }); 
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await userService.registerUser(displayName, email, password, image);

    return res.status(201).json({ token: newUser });
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(errorInternal[0]).json({ message: errorInternal[1] }); 
  }
};

const getAll = async (req, res) => {
  try {
    const users = await userService.findAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(errorInternal[0]).json({ message: errorInternal[1] }); 
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.findById(id);

    res.status(200).json(user);
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(errorInternal[0]).json({ message: errorInternal[1] });
  }
};

const deleteUser = async (req, res) => {
  try {
    const token = req.header('Authorization');

    await userService.deleteUser(token);
    return res.status(204).json();
  } catch (error) {
    return res.status(errorInternal[0]).json({ message: errorInternal[1] });
  }
};

module.exports = { 
  login,
  createUser,
  getAll,
  getUserById,
  deleteUser,
};