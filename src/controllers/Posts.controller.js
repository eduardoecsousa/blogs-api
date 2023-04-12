const postService = require('../services/Posts.service');

const errorInternal = [500, 'Error Internal'];

const createPost = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { title, content, categoryIds } = req.body;

    const newPost = await postService.insertPost(title, content, categoryIds, token);
  
    res.status(201).json(newPost);
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(errorInternal[0]).json({ message: errorInternal[1] }); 
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.findAll();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(errorInternal[0]).json({ message: errorInternal[1] }); 
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.findById(+id);
    return res.status(200).json(post);
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(errorInternal[0]).json({ message: errorInternal[1] }); 
  }
};

const updatePost = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { id } = req.params;
    const { title, content } = req.body;

    const setPost = await postService.update(title, content, +id, token);

    return res.status(200).json(setPost);
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(errorInternal[0]).json({ message: errorInternal[1] }); 
  }
};

const deletePost = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { id } = req.params;

    await postService.deletePost(+id, token);

    return res.status(204).json();
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(errorInternal[0]).json({ message: errorInternal[1] }); 
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getById,
  updatePost,
  deletePost,
};