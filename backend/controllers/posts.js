const Post = require('../models/post');
const User = require('../models/user');
const mongoose = require('mongoose');

const request = require('request');

exports.createPost = (req, res, next) => {
  const post = new Post({
    header: req.body.header,
    message: req.body.message,
    body: req.body.body,
    references: req.body.references,
    poster: req.userData.userId,
    moduleName: req.body.moduleName,
    abstract: req.body.abstract
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
    abstract: req.body.abstract
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
                message: "Update successful!"
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
//`https://ref.scholarcy.com/api/references/download?url=${encodeURI(req.body)}`
exports.fetchReferences = (req, res, next) =>{	
	let options = {
		url: `https://ref.scholarcy.com/api/references/extract?url=${encodeURI(req.body.url)}&document_type=full_paper&resolve_references=true&reference_style=ensemble&engine=v1`,
		headers: {
			'accept':'application/json',
			'Authorization': 'Bearer'
		}
	}
	//console.log(options.url);
	request(options, (e, body, response)=>{
		if(body){
			res.status(200).json(JSON.parse(body.body).reference_links);
		}
		else{
			res.status(500).json({
				message: 'Error Fetching Document: '+e
			})
		}
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

exports.pageVisitCount = (req, res, next) => {
  User.findById({
    _id: req.userData.userId
  }, 'visits', function (err) {
    if (err) {
      res.status(401).json({
        message: "Error Occured!"
      })
    } else {
      User.findOneAndUpdate({
        "visits.postId" : mongoose.Types.ObjectId(req.body.postId),
        },
      {
        $inc : { "visits.$.visitCount" : 1 }
      }, (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          if (doc === null ) {
            const postToAdd = {
              postId : mongoose.Types.ObjectId(req.body.postId)
            };
            User.findByIdAndUpdate({
              _id: mongoose.Types.ObjectId(req.userData.userId)
            },
            {$push: { visits : postToAdd }},
            (err, doc) => {
              if(err) {
                res.status(401).json({
                  message: "Error Occured!"
                })
              } else {
                res.status(200).json({
                  message: "Success!"
                })
              }
            }
          );
          } else {
            res.status(200).json({
              message: "Success!"
            })
          }
        }
      });
    }
  });
}
