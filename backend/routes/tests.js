const express = require('express');
const router = express.Router();
const testController = require('../controllers/test');
const authCheck = require('../middleware/check-auth');

router.post('/save-test', testController.saveTest);
router.post('/CT-pairs', testController.CTpairs);
router.post('/CT-pairs2', authCheck, testController.CTpairs2);
router.get('/', testController.getTests);
router.post('/save-answers', authCheck, testController.saveAnswers) //maybe not needed
router.delete('/:id', testController.deleteTest);
router.post('/stu-test', authCheck, testController.stuTest);
router.post('/stu-get-answered', testController.getStuAnswered)

module.exports = router;