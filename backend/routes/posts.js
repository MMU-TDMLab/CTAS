const express = require('express');

const router = express.Router();

const authCheck = require('../middleware/check-auth');
const PostController = require('../controllers/posts');
const extractFile = require('../middleware/file');

router.post("",
  authCheck,
  extractFile,
  PostController.createPost);

router.put("/:id",
  authCheck,
  extractFile,
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
