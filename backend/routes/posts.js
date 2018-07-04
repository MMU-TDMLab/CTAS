const express = require('express');
const multer = require('multer');

const Post = require('../models/post');
const authCheck = require('../middleware/check-auth');

const router = express.Router();

// const mimeTypeMap = {
//   'file/.txt': 'text/plain',
//   'file/txt': 'text/plain',
//   'file/pdf': 'pdf',
//   'file/text': 'txt',
//   'file/txt': 'txt',
//   'file/word': 'word'
// }
//////

// const mimeTypeMap = multer({
//   fileFilter: function (req, file, cb) {

//     var filetypes = /txt|text/;
//     var mimetype = filetypes.test(file.mimetype);
//     var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb("Error: File upload only supports the following filetypes - " + filetypes);
//   }
// });
/////
///////
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const isValid = mimeTypeMap[file.mimetype];
    // let error = new Error('Invalid mime type');
    // if (!isValid) {
    //   error = null;
    // }
    cb(null, 'backend/documents');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const nameWithoutExtension = name.replace(/\.[^/.]+$/, "");
    const fileExtention = file.originalname.split('.').pop();
    const fileName = nameWithoutExtension;
    cb(null, fileName + '-' + Date.now() + '.' + fileExtention);
  }
});

router.post("",
  authCheck,
  multer({
    storage: storage
  }).single('file'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
      header: req.body.header,
      message: req.body.message,
      filePath: url + '/documents/' + req.file.filename,
      poster: req.userData.userId
    });
    post.save().then(createdPost => {
      console.log(createdPost);
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id,
        }
      });
    });
  });

router.put("/:id",
  authCheck,
  multer({
    storage: storage
  }).single('file'), (req, res, next) => {
    let filePath = req.body.filePath;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      filePath = url + '/documents/' + req.file.filename
    }
    const post = new Post({
      _id: req.body.id,
      header: req.body.header,
      message: req.body.message,
      filePath: filePath,
      poster: req.userData.userId
    });
    console.log(post);
    Post.updateOne({
      _id: req.params.id,
      poster: req.userData.userId
    }, post).then(result => {
      if (result.nModified > 0) {
        res.status(200).json({
          message: "Update successful!"
        });
      } else {
        res.status(401).json({
          message: "Not authorised!"
        });
      }
    });
  });

router.get("", (req, res, next) => {
  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: documents
      });
    });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: 'Post not found!'
      });
    }
  })
})

router.delete("/:id",
  authCheck,
  (req, res, next) => {
    Post.deleteOne({
      _id: req.params.id, poster: req.userData.userId
    }).then(result => {
      // console.log(result);
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
  });

module.exports = router;
