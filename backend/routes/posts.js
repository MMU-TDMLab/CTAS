const express = require('express');
const multer = require('multer');
const router = express.Router();

const authCheck = require('../middleware/check-auth');
const PostController = require('../controllers/posts');


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
  multer({ storage: storage }).single('file'),
  PostController.createPost);

router.put("/:id",
  authCheck,
  multer({ storage: storage }).single('file'),
  PostController.updatePost);

router.get("", PostController.getPosts);

router.get('/:id', PostController.getPostById);

router.delete("/:id",
  authCheck,
  PostController.deletePost);

// router.delete("/:id",
//   authCheck,
//   (req, res, next) => {
//     User.find()
//     .then(documents => {
//       console.log(documents);
//     });
//     Post.deleteOne({
//       _id: req.params.id,
//       poster: req.userData.userId,
//       role: req.userData.role
//     }).then(result => {
//       // console.log(result);
//       if (result.n > 0) {
//         res.status(200).json({
//           message: "Deletion successful!"
//         });
//       } else {
//         res.status(401).json({
//           message: "Not authorised!"
//         });
//       }
//     })
//   });

module.exports = router;
