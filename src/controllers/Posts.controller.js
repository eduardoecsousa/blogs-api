const postController = require('../services/Posts.service');

const createPost = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { title, content, categoryIds } = req.body;

    const newPost = await postController.insertPost(title, content, categoryIds, token);
  
    res.status(201).json(newPost);
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: 'Error Internal' }); 
  }
};

module.exports = { createPost };