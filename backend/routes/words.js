const express = require('express');
// const multer = require('multer');

// const Post = require('../models/post');
const User = require('../models/user');
const Word = require('../models/complex-words');
const authCheck = require('../middleware/check-auth');

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
        message: "Complex Word has been added successfully!",
        result: result
      });
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({
        message: 'Word was not added!'
        // error: err
      })
    });
});

router.get("", (req, res, next) => {
  Word.find()
    .then(documents => {
      // console.log('hey', documents);
      res.status(200).json({
        message: 'Words fetched succesfully!',
        words: documents
      });
    });
});

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

router.put('/update/:word', (req, res, next) => {
  Word.findOneAndUpdate({
    word: req.params.word
  },
  { $set: { annotation: req.params.annotation }},
  { upsert: true },
  (err, newWord) => {
    if (err) {
      console.log('error occured');
    } else {
      console.log(newWord);
      res.status(204).json({
        message: "Update successful!"
      });
    }
  });
});


router.delete("/delete-word:word",
  // authCheck,
  (req, res, next) => {
    // User.findOne({
    //     role: 'admin'
    //   })
    // .then(user => {
    //   console.log(user);
    // if (!req.userData.role === 'admin') {
    Word.deleteOne({
      word: req.params.word,
    }).then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Deletion successful!"
        });
      } else {
        res.status(401).json({
          message: "Not authorised!"
        });
      }
    })
    // }
  })
// });

module.exports = router;
