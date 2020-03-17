const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');
const isVerified = require('../middleware/isVerified');

const dashboardGetController = require('../controllers/user/dashboard/get');

router.get(
  '/dashboard',
  isLoggedIn,
  isVerified,
  dashboardGetController
);

module.exports = router;
