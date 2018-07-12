const express = require('express');
// const multer = require('multer');

// const Post = require('../models/post');
// const User = require('../models/user');
const Word = require('../models/complex-words');

const router = express.Router();
// authCheck,
router.post("/new-word", (req, res, next) => {
  const word = new Word({
    word: req.body.word,
    annotation: req.body.annotation,
  });
  word.save()
    .then(result => {
      res.status(201).json({
        message: "Complex Word has been added successfully",
        result: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

module.exports = router;
