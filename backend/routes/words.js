const express = require('express');
const router = express.Router();

const WordController = require('../controllers/words');


router.post("/new-word", WordController.newWord);

router.get("", WordController.findWords);

router.put('/update:word', WordController.updateWord);

router.delete("/delete-word:word", WordController.deleteWord
  // authCheck,
  );

module.exports = router;
