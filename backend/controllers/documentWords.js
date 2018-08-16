const DocumentWord = require('../models/document-words');
const Post = require('../models/post');

const infrequentWords = [];

// let postBody = '';

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
          // let jointWords = hardWords.join(' ');
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
        if (freq <= 500) {
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

exports.readTexty = (req, res, next) => {
  // Read the file and print its contents.
  const fs = require("fs"),
    path = require("path"),
    // filePath = path.join(__dirname, "../documents/vocab_cs");
    // filePath = path.join(__dirname, "../documents/textfile.txt");
    filePath = path.join(__dirname, "../documents/vocabMod_cs");

  const readline = require('readline');
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath)
  });
  const infrequentWords = [];
  let error = false;
  rl.on('line', function (line) {
    const lines = line.split('\t');
    try {
      const freq = Number(lines[1]);
      if (freq <= 200) {
        // const obj = {
        //   word: lines[0],
        //   freq: freq,
        // }
        infrequentWords.push(lines[0]);
      }
      infrequentWordsString = infrequentWords.join(' ');
      //   // console.log(`Word ${word.word} : freq ${word.freq}`);

    } catch (error) {
      error = true;
    }
  });

  rl.on("close", () => {
    if (!error) {
      res.status(200).json(infrequentWordsString);
    } else {
      res.status(500).send();
    }
  })

  // fs.readFile(filePath, { encoding: "utf-8" }, function(err, data) {
  //   if (!err) {
  //     // console.log("received data: " + data);
  //     res.status(200).json(data);
  //   } else {
  //     res.status(500).send();
  //   }
  // });
}

// exports.readText = (req, res, next) => {
//   const reader = require ("buffered-reader");
//   const BinaryReader = reader.BinaryReader;
//   const DataReader = reader.DataReader;

//   let close = function (binaryReader, error){
//       if (error) console.log (error);

//       binaryReader.close (function (error){
//           if (error) console.log (error);
//       });
//   };

//   let file = "file";
//   let offset;

//   new DataReader (file, { encoding: "utf8" })
//           .on ("error", function (error){
//               console.log (error);
//           })
//           .on ("line", function (line, nextByteOffset){
//               if (line === "Phasellus ultrices ligula sed odio ultricies egestas."){
//                   offset = nextByteOffset;
//                   this.interrupt ();
//               }
//           })
//           .on ("end", function (){
//               new BinaryReader (file)
//                       .seek (offset, function (error){
//                           if (error) return close (this, error);

//                           this.read (9, function (error, bytes, bytesRead){
//                               if (error) return close (this, error);

//                               console.log(bytes.toString ()); //Prints: Curabitur

//                               close (this);
//                           });
//                       });
//           })
//           .read ();
//   }
