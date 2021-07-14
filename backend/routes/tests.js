const express = require('express');
const router = express.Router();
const testController = require('../controllers/test');

router.post('/save-test', testController.saveTest);
router.post('/CT-pairs', testController.CTpairs);
router.get('/', testController.getTests);

module.exports = router;