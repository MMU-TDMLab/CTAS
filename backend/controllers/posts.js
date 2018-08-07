const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = (req, res, next) => {
  const post = new Post({
    header: req.body.header,
    message: req.body.message,
    body: req.body.body,
    references: req.body.references,
    poster: req.userData.userId,
  });
  post.save().then(createdPost => {
      res.status(201).json({
        message: "Post added Successfully",
        post: {
          ...createdPost,
          id: createdPost._id,
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating Post Failed!"
      });
    });
}

exports.updatePost = (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    header: req.body.header,
    message: req.body.message,
    body: req.body.body,
    references: req.body.references,
    poster: req.userData.userId,
  });
  User.findOne({
      role: 'admin'
    })
    .then(user => {
      if (!req.userData.role === 'admin') {
        Post.updateOne({
          _id: req.params.id,
          poster: req.userData.userId
        }, post).then(result => {
          if (result.n > 0) {
            res.status(200).json({
              message: "Update successful!"
            });
          } else {
            res.status(401).json({
              message: "Not authorised!"
            });
          }
        });
      } else {
        Post.updateOne({
            _id: req.params.id,
            poster: req.userData.userId
          }, post).then(result => {
            if (result.n > 0) {
              res.status(200).json({
                message: "Admin Update successful!"
              });
            } else {
              res.status(401).json({
                message: "Not authorised!"
              });
            }
          })
          .catch(error => {
            res.status(500).json({
              message: "Could not update post!"
            });
          })
      }
    });
}

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(documents => {
      // console.log(documents);
      res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
}

exports.getPostById = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: 'Post not found!'
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching post failed!"
    });
  });
}

exports.deletePost = (req, res, next) => {
  User.findOne({
      role: 'admin'
    })
    .then(user => {
      if (!req.userData.role === 'admin') {
        Post.deleteOne({
          _id: req.params.id,
          poster: req.userData.userId,
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
        })
      } else {
        Post.deleteOne({
          _id: req.params.id,
          poster: req.userData.userId,
        }).then(result => {
          if (result.n > 0) {
            res.status(200).json({
              message: "Admin Deletion successful!"
            });
          } else {
            res.status(401).json({
              message: "Not authorised!"
            });
          }
        })
        .catch(error => {
          res.status(500).json({
            message: "Post not deleted!"
          });
        });
      }
    })
}
