const DocumentWord = require('../models/document-words');
// const Post = require('../models/post');

exports.newWord = (req, res, next) => {
  const word = new DocumentWord({
    word: req.body.word,
    annotation: req.body.annotation,
    document_id: req.body.document_id,
  });
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
  DocumentWord.findByIdAndUpdate({
    _id: req.params.id
  },
  { $set: { annotation: req.body.annotation }},
  { upsert: false },
  (err) => {
    if (err) {
      console.log('Error Occured');
    } else {
      res.status(200).json({
        message: "Update successful!"
      })
    }
  });
}

exports.deleteWord = (req, res, next) => {
  DocumentWord.findByIdAndRemove({
    _id: req.params.id
  })
  .then(result => {
    res.status(200).json({
      message: "Document Word has been deleted successfully!",
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      message: 'Document Word was not deleted!'
    })
  });
}

exports.readText = (req, res, next) => {
// Read the file and print its contents.
const fs = require("fs"),
path = require("path"),
filePath = path.join(__dirname, "../documents/textfile.txt");

fs.readFile(filePath, { encoding: "utf-8" }, function(err, data) {
  if (!err) {
    // console.log("received data: " + data);
    res.status(200).json(data);
  } else {
    res.status(500).send();
  }
});
}




