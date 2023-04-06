const express = require('express');
const { login } = require('../controllers/Login.controller');
const checkEmailAndPassword = require('../middlewares/checkEmailAndPassword');

const router = express.Router();

router.post('/', checkEmailAndPassword, login);

module.exports = router;