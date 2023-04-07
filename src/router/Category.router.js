const express = require('express');
const categoryController = require('../controllers/Category.controller');
const authenticateToken = require('../middlewares/authenticationToken');
const { validaInputName } = require('../middlewares/checkInputs');

const router = express.Router();

router.post('/', authenticateToken, validaInputName, categoryController.regiterCategory);

module.exports = router;