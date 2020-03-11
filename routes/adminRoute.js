const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');

const indexGetController = require('../controllers/admin/index/get');
const loginGetController = require('../controllers/admin/auth/get');
const applicationsGetController = require('../controllers/admin/applications/get');

const loginPostController = require('../controllers/admin/auth/post');
const applicationsPostController = require('../controllers/admin/applications/post');

router.get(
  '/',
  isAdmin,
  indexGetController
);
router.get(
  '/login',
  loginGetController
);
router.get(
  '/applications',
  isAdmin,
  applicationsGetController
);

router.post(
  '/login',
  loginPostController
);
router.post(
  '/applications',
  isAdmin,
  applicationsPostController
);

module.exports = router;
