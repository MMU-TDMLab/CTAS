const express = require('express');
const router = express.Router();

const authCheck = require('../middleware/check-auth');
const AnalyticsController = require('../controllers/analytics');
// const UserController = require('../controllers/user');

router.get('', authCheck, AnalyticsController.getAllAnalytics);

// router.post('/page-activity', authCheck, UserController.userActivity);

// router.post('/annotation-activity', authCheck, UserController.userAnnotationActivity);

module.exports = router;
