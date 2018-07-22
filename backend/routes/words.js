const express = require('express');
// const multer = require('multer');
// const Post = require('../models/post');
// const User = require('../models/user');
// const Word = require('../models/complex-words');
// const authCheck = require('../middleware/check-auth');

const WordController = require('../controllers/words');

const router = express.Router();

router.post("/new-word", WordController.newWord);

router.get("", WordController.findWords);

// router.put('/update/:word', (req, res, next) => {

//   const reqWord = req.params.word;

//   let word = word.filter(word => {
//     return word.word == reqWord;
//   })[0];

//   const index = word.indexOf(word);

//   const keys = Object.keys(req.body);

//   keys.forEach(key => {
//     word[key] = req.body[key];
//   });

//   word[index] = word;

//   res.json(word[index]);

// });

// router.put('/update/:word', (req, res, next) => {
//   // const word = new Word ({
//   //   word: req.body.word,
//   //   annotation: req.body.annotation,
//   // });
//   const {
//     word,
//     annotation,
//   } = req.body;

//   // , word
//   // update
//   Word.updateOne({
//       word: req.params.word,
//       // annotation: req.params.annotation
//     }).then(result => {
//       if (result.nModified > 0) {
//         res.status(200).json({
//           message: "Update successful!"
//         });
//       } else {
//         res.status(401).json({
//           message: "Not authorised!"
//         });
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({
//         message: "Could not update post!"
//       });
//     })
// });

router.put('/update/:word', WordController.updateWord);


router.delete("/delete-word:word", WordController.deleteWord
  // authCheck,
  );

module.exports = router;
