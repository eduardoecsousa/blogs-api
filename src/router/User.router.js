const express = require('express');
const userController = require('../controllers/User.controller');
const authenticateToken = require('../middlewares/authenticationToken');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', authenticateToken, userController.getAll);
router.get('/:id', authenticateToken, userController.getUserById);

module.exports = router;