const express = require('express');
const router = express.Router();

const DocumentWordsController = require('../controllers/documentWords');

router.post("/new-word", DocumentWordsController.newWord);

router.get("", DocumentWordsController.findWords);

router.put('/update:id', DocumentWordsController.updateWord);

router.post("/delete-word:id", DocumentWordsController.deleteWord);
// router.delete("/delete-word:word", DocumentWordsController.deleteWord);

module.exports = router;
