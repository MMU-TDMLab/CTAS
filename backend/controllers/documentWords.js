const DocumentWord = require('../models/document-words');
const Post = require('../models/post');

const infrequentWords20 = [];
const infrequentWords10 = [];
const infrequentWords5 = [];

/**
 * This is the documentWords backend manager, this will take care of adding new words, finding words
 * updating words, deleting words and also specially reading the big file which identifies which words are
 * the difficult words.
 */

/**
 * New word saves the new word which has been passed over from the request.
 * @param {*} req : Request holds the body word, annotation and document id.
 * @param {*} res : Response holds the status of the save, if it catches an
 * error it will pass it to the frontend and display the appropiate message.
 */
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

/**
 * This findWords finds all the words in the database.
 * @param {*} res : Response holds all the words.
 */
exports.findWords = (req, res, next) => {
  DocumentWord.find()
    .then(documents => {
      res.status(200).json({
        message: 'Document Words fetched succesfully!',
        words: documents
      });
    });
}

/**
 * updateWords finds the word by ID and updates the annotation which
 * comes from the body.
 * @param {*} req Request will hold the id of the post from the params and
 * change the annotation to the one in the request body.
 * @param {*} res Response holds the status of the update, if it catches an
 * error it will pass it to the frontend and display the appropiate message.
 */
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

/**
 *
 * @param {*} req Request will hold the word id in the params, and delete
 * the word by the id of the word.
 * @param {*} res Response holds the status of the delete, if it catches an
 * error it will pass it to the frontend and display the appropiate message.
 */
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

/**
 * The readText checks the post ID and it gets the hard words from that particular post. It calls the checkIfWordsMatch
 * which checks if the words from the post match any of the difficult words with the set criteria. If so send the word/s
 * over to the frontend.
 * @param {*} req Request holds the post id via the params.
 * @param {*} res If post is not found then it will return error, if not it will work through the function.
 */
exports.readText = (req, res, next) => {
  if (infrequentWords20.length > 0) {
    Post.findOne({
      _id: req.params.id
    }).then(result => {
      if (result) {
        checkIfWordsMatch(result.body, hardWords => {
          // console.log(hardWords[2]);
          res.status(200).json(hardWords);
        });
      } else {
        res.status(404).json({
          message: 'Post not found!'
        });
      }
    });
  } else {
    res.status(500).json({
      message: 'Internal Error'
    });
  }
}

parseFileIntoMemory();

function parseFileIntoMemory() {
  const fs = require('fs'),
    es = require('event-stream'),
    path = require("path"),
    // filePath = path.join(__dirname, "../documents/vocab_cs");
    filePath = path.join(__dirname, "../documents/vocab_cs 2");
    // filePath = path.join(__dirname, "../documents/vocabMod_cs");

  console.log(`Starting to process file: ${filePath}`);

  let s = fs.createReadStream(filePath)
    .pipe(es.split())
    .pipe(es.mapSync((line) => {
        const lines = line.split('\t');
        const freq = Number(lines[1]);
        if (freq >= 20000) {
          infrequentWords20.push(lines[0]);
        }
        if (freq >= 13000) {
          infrequentWords10.push(lines[0]);
        }
        if (freq >= 10000) {
          infrequentWords5.push(lines[0]);
        }
        // pause the readstream
        s.pause();

        // process line here and call s.resume() when rdy

        // resume the readstream, possibly from a callback
        s.resume();
      })
      .on('error', (err) => {
        infrequentWords20 = [];
        console.log('Error while reading file.', err);
      })
      .on('end', () => {
        console.log('Read entire file.')
      })
    );
}

function checkIfWordsMatch(body, callback) {
  const hardWords20 = [];
  const hardWords10 = [];
  const hardWords5 = [];
  const arrayOfArrays = [hardWords20, hardWords10, hardWords5];
  const lowerCaseBody = body.toLowerCase();
  const words = lowerCaseBody.split(' ');

  words.map((word) => {
    if (!infrequentWords20.includes(word)) {
      let = hardWords20.push(word);
    }
    if (!infrequentWords10.includes(word)) {
      let = hardWords10.push(word);
    }
    if (!infrequentWords5.includes(word)) {
      let = hardWords5.push(word);
    }
  });
  // console.log('20 ',hardWords20.length);
  // console.log('10 ', hardWords10.length);
  // console.log('5 ', hardWords5.length);
  // console.log('5: ', arrayOfArrays[0], ' 10: ', arrayOfArrays[1], ' 20: ', arrayOfArrays[2]);
  return callback(arrayOfArrays);
}
