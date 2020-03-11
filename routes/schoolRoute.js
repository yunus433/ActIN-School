const express = require('express');
const router = express.Router();

const isLoggedInSchool = require('../middleware/isLoggedInSchool');
const isVerifiedSchool = require('../middleware/isVerifiedSchool');

const dashboardGetController = require('../controllers/school/dashboard/get');
const applicationsGetController = require('../controllers/school/applications/get');

const applicationsPostController = require('../controllers/school/applications/post');

router.get(
  '/dashboard',
  isLoggedInSchool,
  isVerifiedSchool,
  dashboardGetController
);
router.get(
  '/applications',
  isLoggedInSchool,
  isVerifiedSchool,
  applicationsGetController
);

router.post(
  '/applications',
  isLoggedInSchool,
  isVerifiedSchool,
  applicationsPostController
);

module.exports = router;
