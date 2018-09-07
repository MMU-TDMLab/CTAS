const express = require('express');
const router = express.Router();

// const authCheck = require('../middleware/check-auth');
const AnalyticsController = require('../controllers/analytics');
// const UserController = require('../controllers/user');

router.get('', AnalyticsController.getAllAnalytics);

router.get('/user-clicks', AnalyticsController.getUserClicks);

module.exports = router;
