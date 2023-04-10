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
      { model: Category, as: 'categories', attributes: { exclude: ['{PostCategory}'] } },
    ],
  });
  
  if (!post) {
    throw Object.assign(new Error('Post does not exist'), { code: 404 });
  }

  return post;
};

module.exports = {
  insertPost,
  findAll,
  findById,
};