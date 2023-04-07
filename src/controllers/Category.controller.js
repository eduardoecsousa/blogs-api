const categoryServise = require('../services/Category.service');

const regiterCategory = async (req, res) => {
  const { name } = req.body;

  const newUser = await categoryServise.insertCategory(name);

  res.status(201).json(newUser);
};

module.exports = {
  regiterCategory,
};