const express = require('express');
const router = express.Router();

const DocumentWordsController = require('../controllers/documentWords');
const UserController = require('../controllers/user');
const authCheck = require('../middleware/check-auth');

router.get('/:id', DocumentWordsController.readText);

router.post('/new-word', DocumentWordsController.newWord);

router.post('/get-definition', DocumentWordsController.getDefinition)

router.get('', DocumentWordsController.findWords);

router.put('/update:id', DocumentWordsController.updateWord);

router.delete('/delete-word:id', DocumentWordsController.deleteWord);

router.post('/page-activity', authCheck, UserController.userActivity);

router.post('/annotation-activity', authCheck, UserController.userAnnotationActivity);

module.exports = router;
