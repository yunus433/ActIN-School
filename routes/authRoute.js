const express = require('express');
const router = express.Router();

const loginGetController = require('../controllers/auth/login/get');
const registerGetController = require('../controllers/auth/register/get');
const schoolLoginGetController = require('../controllers/auth/school/login/get');
const schoolRegisterGetController = require('../controllers/auth/school/register/get');

const loginPostController = require('../controllers/auth/login/post');
const registerPostController = require('../controllers/auth/register/post');
const schoolLoginPostController = require('../controllers/auth/school/login/post');
const schoolRegisterPostController = require('../controllers/auth/school/register/post');

router.get(
  '/login', 
  loginGetController
);
router.get(
  '/register',
  registerGetController
);
router.get(
  '/school/login',
  schoolLoginGetController
);
router.get(
  '/school/register',
  schoolRegisterGetController
);

router.post(
  '/login', 
  loginPostController
);
router.post(
  '/register',
  registerPostController
);
router.get(
  '/school/login',
  schoolLoginPostController
);
router.get(
  '/school/register',
  schoolRegisterPostController
);

module.exports = router;
