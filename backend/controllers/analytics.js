const Activities = require('../models/user-activity');

exports.getAllAnalytics = (req, res, next) => {
  Activities.find()
    .then(documents => {
      console.log('activities controller: ', documents);
      res.status(200).json({
        message: 'Activities were fetched succesfully!',
        analytics: documents
      });
    });
}
