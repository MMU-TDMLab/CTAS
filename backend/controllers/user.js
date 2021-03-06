const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Activity = require('../models/user-activity');
const AnnotationClick = require('../models/annotation-activity');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        role: req.body.role
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User Created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
              message: "Invalid authentication credentials!"
          });
        });
    });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Invalid Credentials'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Invalid Credentials'
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id, role: fetchedUser.role },
         process.env.JWT_KEY,
         { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        // expiresIn: 7200,
        expiresIn: 3600,
        userId: fetchedUser._id,
        role: fetchedUser.role
      });
    })
    .catch(err => {
		//console.log(err);
      return res.status(401).json({
        message: 'Invalid authentication credentials!'
      });
    });
}

exports.userActivity = (req, res, next) => {
  const userActivity = new Activity({
    userId: req.userData.userId,
    visitDate: req.body.date,
    visitDurationSeconds: req.body.time,
    postId: req.body.postId
  });
  userActivity.save()
    .then(result => {
      res.status(200).json({
        message: 'User Activity has been added successfully!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'User Activity not recorded!'
      })
    });
}

exports.userAnnotationActivity = (req, res, next) => {
  const userAnnotationActivity = new AnnotationClick({
    word: req.body.word,
    userId: req.userData.userId,
    visitDate: req.body.date,
    postId: req.body.postId
  });
  userAnnotationActivity.save()
    .then(result => {
      res.status(200).json({
        message: 'User Activity has been added successfully!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'User Activity not recorded!'
      })
    });
}

