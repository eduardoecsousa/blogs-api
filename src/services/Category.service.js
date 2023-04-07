const { Category } = require('../models');

const insertCategory = async (name) => {
  const create = await Category.create({ name });
  console.log(create);

  return { id: create.null, name };
};

const findAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  insertCategory,
  findAll,
};