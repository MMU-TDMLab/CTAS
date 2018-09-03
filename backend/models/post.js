const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  header: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  references: {
    type: String,
    required: true
  },
  poster: {
    type: mongoose.Schema.Types.ObjectId,  // Gets the ID of the user who posted
    ref: 'User',
    required: true
  },
  moduleName: {
    type: String
  }
});

module.exports = mongoose.model('Post', postSchema);
