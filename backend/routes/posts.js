const express = require('express');

const Post = require('../models/post');

const router = express.Router();


router.post("", (req, res, next) => {
  const post = new Post({
    header: req.body.header,
    message: req.body.message
  });
  post.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    header: req.body.header,
    message: req.body.message
  });
  console.log(post);
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({ message: "Update successful!" });
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
  Post.findById(req.params.id).then(post =>{
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found!'});
    }
  })
})

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post deleted!'});
  })
});

module.exports = router;
