const DocumentWord = require('../models/document-words');
const Post = require('../models/post');

const infrequentWords = [];

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
    }, {
      $set: {
        annotation: req.body.annotation
      }
    }, {
      upsert: false
    },
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
  if (infrequentWords.length > 0) {
    Post.findOne({
      _id: req.params.id
    }).then(result => {
      if (result) {
        checkIfWordsMatch(result.body, hardWords => {
          console.log(hardWords);
          res.status(200).json(hardWords);
        });
      } else {
        res.status(404).json({
          message: 'Post not found!'
        });
      }
    });
  } else {
    res.status(500).send();
  }
}

parseFileIntoMemory();

function parseFileIntoMemory() {
  const fs = require('fs'),
    es = require('event-stream'),
    path = require("path"),
    // filePath = path.join(__dirname, "../documents/vocab_cs");
    filePath = path.join(__dirname, "../documents/vocabMod_cs");

  console.log(`Starting to process file: ${filePath}`);

  let s = fs.createReadStream(filePath)
    .pipe(es.split())
    .pipe(es.mapSync((line) => {
        const lines = line.split('\t');
        const freq = Number(lines[1]);
        if (freq <= 10000) {
          infrequentWords.push(lines[0]);
        }
        // pause the readstream
        s.pause();

        // process line here and call s.resume() when rdy

        // resume the readstream, possibly from a callback
        s.resume();
      })
      .on('error', (err) => {
        infrequentWords = [];
        console.log('Error while reading file.', err);
      })
      .on('end', () => {
        console.log('Read entire file.')
      })
    );
}

function checkIfWordsMatch(body, callback) {
  const hardWords = [];
  const words = body.split(' ');

  words.map((word) => {
    if (infrequentWords.includes(word)) {
      let = hardWords.push(word);
    }
  });
  return callback(hardWords);
}
