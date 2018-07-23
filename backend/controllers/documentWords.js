const DocumentWord = require('../models/document-words');
const Post = require('../models/post');

exports.newWord = (req, res, next) => {
  const word = new DocumentWord({
    word: req.body.word,
    annotation: req.body.annotation,
    document_id: req.body.id,
  });
  // console.log(req.body);
  word.save()
    .then(result => {
      res.status(200).json({
        message: "Document Word has been added successfully!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Document Word was not added!'
        // error: err
      })
    });
}

exports.findWords = (req, res, next) => {
  DocumentWord.find()
    .then(documents => {
      res.status(200).json({
        message: 'Document Words fetched succesfully!',
        words: documents
      });
    });
}

exports.updateWord = (req, res, next) => {
  DocumentWord.findOneAndUpdate({
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
  DocumentWord.deleteOne({
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

