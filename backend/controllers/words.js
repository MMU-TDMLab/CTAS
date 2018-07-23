const Word = require('../models/complex-words');

exports.newWord = (req, res, next) => {
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
      res.status(500).json({
        message: 'Word was not added!'
        // error: err
      })
    });
}

exports.findWords = (req, res, next) => {
  Word.find()
    .then(documents => {
      res.status(200).json({
        message: 'Words fetched succesfully!',
        words: documents
      });
    });
}

exports.updateWord = (req, res, next) => {
  Word.findOneAndUpdate({
    word: req.params.word
  },
  { $set: { annotation: req.body.annotation }},
  { upsert: false },
  // (err, newWord) => {
  (err) => {
    if (err) {
      console.log('Error Occured');
    } else {
      res.status(200).json({
        message: "Update successful!"
      })
      // .catch(error => {
      //     res.status(500).json({
      //         message: "Could not update post!"
      //     });
      //   })
    }
  });
}

exports.deleteWord = (req, res, next) => {
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
  });
}
