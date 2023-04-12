const express = require('express');
const postController = require('../controllers/Posts.controller');
const authenticateToken = require('../middlewares/authenticationToken');
const { validaInputsCreatePost, validaInputsUpdatePost } = require('../middlewares/checkInputs');

const router = express.Router();

router.post('/', authenticateToken, validaInputsCreatePost, postController.createPost);
router.get('/search', authenticateToken, postController.getSearchText);
router.get('/', authenticateToken, postController.getAllPosts);
router.get('/:id', authenticateToken, postController.getById);
router.put('/:id', authenticateToken, validaInputsUpdatePost, postController.updatePost);
router.delete('/:id', authenticateToken, postController.deletePost);

module.exports = router;