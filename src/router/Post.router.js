const express = require('express');
const postController = require('../controllers/Posts.controller');
const authenticateToken = require('../middlewares/authenticationToken');
const { validaInputsCreatePost } = require('../middlewares/checkInputs');

const router = express.Router();

router.post('/', authenticateToken, validaInputsCreatePost, postController.createPost);

module.exports = router;