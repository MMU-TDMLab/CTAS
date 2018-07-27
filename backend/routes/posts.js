const express = require('express');

const router = express.Router();

const authCheck = require('../middleware/check-auth');
const PostController = require('../controllers/posts');

router.post("",
  authCheck,
  PostController.createPost);

router.put("/:id",
  authCheck,
  PostController.updatePost);

router.get("", PostController.getPosts);

router.get('/:id', PostController.getPostById);

router.delete("/:id",
  authCheck,
  PostController.deletePost);

module.exports = router;
