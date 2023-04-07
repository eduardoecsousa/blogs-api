const categoryServise = require('../services/Category.service');

const regiterCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await categoryServise.insertCategory(name);
  
    res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ message: 'Error Internal' }); 
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const categories = await categoryServise.findAll();
  
    res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Error Internal' }); 
  }
};

module.exports = {
  regiterCategory,
  getAllCategories,
};