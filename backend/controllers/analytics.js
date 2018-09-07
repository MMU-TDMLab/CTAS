const Activities = require('../models/user-activity');
const User = require('../models/user');

exports.getAllAnalytics = (req, res, next) => {
  Activities.find()
    .then(documents => {
      res.status(200).json({
        message: 'Activities were fetched succesfully!',
        analytics: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching activities failed!"
      });
    });
}

exports.getUserClicks = (req, res, next) => {
  User.find()
    .then(documents => {
      res.status(200).json({
        message: 'Activities were fetched succesfully!',
        users: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching users clicks failed!"
      });
    });
}
