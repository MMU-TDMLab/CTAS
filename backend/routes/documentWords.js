const express = require('express');

const DocumentWordsController = require('../controllers/documentWords');

const router = express.Router();

router.post("/new-word", DocumentWordsController.newWord);

router.get("", DocumentWordsController.findWords);

router.put('/update:word', DocumentWordsController.updateWord);

router.delete("/delete-word:word", DocumentWordsController.deleteWord);

module.exports = router;
