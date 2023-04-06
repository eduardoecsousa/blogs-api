const express = require('express');
const { login } = require('../controllers/User.controller');
const checkEmailAndPassword = require('../middlewares/checkEmailAndPassword');

const router = express.Router();

router.post('/', checkEmailAndPassword, login);

module.exports = router;