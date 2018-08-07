const express = require('express');
const router = express.Router();

const DocumentWordsController = require('../controllers/documentWords');

router.post("/new-word", DocumentWordsController.newWord);

router.get("", DocumentWordsController.findWords);

router.put('/update:word', DocumentWordsController.updateWord);

router.delete("/delete-word:word", DocumentWordsController.deleteWord);

module.exports = router;
