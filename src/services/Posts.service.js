const { Op } = require('sequelize');
const { PostCategory, BlogPost, User, Category } = require('../models');
const { authenticateToken } = require('../auth/jwt');
const { verificationCategories } = require('./validations/validationInputsValues');

const insertPost = async (title, content, categoryIds, token) => {
  const decode = authenticateToken(token);
  const { code, message } = await verificationCategories(categoryIds);

  if (code) {
    throw Object.assign(new Error(message), { code });
  }
  
  const post = await BlogPost.create({ 
    title, content, userId: decode.id, published: new Date(), updated: new Date(),
  });

  const categorys = categoryIds.map((id) => ({ postId: post.null, categoryId: id }));

  await PostCategory.bulkCreate(categorys);
  
  return {
    id: post.null, 
    title,
    content,
    userId: post.dataValues.userId,
    updated: post.dataValues.updated,
    published: post.dataValues.published,
   };
};

const findAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return posts;
};

const findById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  if (!post) {
    throw Object.assign(new Error('Post does not exist'), { code: 404 });
  }

  return post;
};

const update = async (title, content, idPost, token) => {
  const { id } = authenticateToken(token);
  const { userId } = await findById(idPost);
  console.log(id, userId);

  if (id !== userId) {
    throw Object.assign(new Error('Unauthorized user'), { code: 401 });
  }

  await BlogPost.update(
    { title, content, updated: new Date() },
    { where: { id: idPost } },
  );
  const updatedPost = findById(id);
  return updatedPost;
};

const deletePost = async (idPost, token) => {
  const { id } = authenticateToken(token);
  const { userId } = await findById(idPost);

  if (!userId) {
    throw Object.assign(new Error('Post does not exist'), { code: 404 });
  }

  if (id !== userId) {
    throw Object.assign(new Error('Unauthorized user'), { code: 401 });
  }
  
  await BlogPost.destroy({
    where: {
      id: idPost,
    },
  });

  return true;
};

const searchPost = async (textSearch) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `${textSearch}%` } },
        { content: { [Op.like]: `${textSearch}%` } },
      ], 
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

module.exports = {
  insertPost,
  findAll,
  findById,
  update,
  deletePost,
  searchPost,
};