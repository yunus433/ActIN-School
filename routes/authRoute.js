const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedInSchool = require('../middleware/isLoggedInSchool');

const loginGetController = require('../controllers/auth/login/get');
const registerGetController = require('../controllers/auth/register/get');
const verifyGetController = require('../controllers/auth/verify/get');
const schoolLoginGetController = require('../controllers/auth/school/login/get');
const schoolRegisterGetController = require('../controllers/auth/school/register/get');
const schoolVerifyGetController = require('../controllers/auth/school/verify/get');

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
  '/verify',
  isLoggedIn,
  verifyGetController
);
router.get(
  '/school/login',
  schoolLoginGetController
);
router.get(
  '/school/register',
  schoolRegisterGetController
);
router.get(
  '/school/verify',
  isLoggedInSchool,
  schoolVerifyGetController
);

router.post(
  '/login', 
  loginPostController
);
router.post(
  '/register',
  registerPostController
);
router.post(
  '/school/login',
  schoolLoginPostController
);
router.post(
  '/school/register',
  schoolRegisterPostController
);

module.exports = router;
