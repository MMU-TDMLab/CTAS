const express = require('express');
const router = express.Router();
const testController = require('../controllers/test');

router.get('', testController.findWords);
router.post('/add-word', testController.addWord);
router.put('/update-word:id', testController.updateWord);
router.delete('/delete-word:id', testController.deleteWord);
router.post('/CT-pairs', testController.addWord);

module.exports = router;