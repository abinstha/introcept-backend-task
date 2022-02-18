const express = require('express');
const { newUser, newUserSchema } = require('../controllers/user');
const { userValidationRules, validate } = require('../errors/validator');

const router = express.Router();

router.route('/').post(userValidationRules(), validate, newUser);
router.route('/schema').post(newUserSchema);

module.exports = router;