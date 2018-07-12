const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  header: {  // Post Title
    type: String,
    required: true
  },
  message: { // Post Message
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileText: {
    type: String,
    required: true
  },
  poster: {
    type: mongoose.Schema.Types.ObjectId,  // Gets the ID of the user who posted
    ref: 'User',
    required: true }
});

module.exports = mongoose.model('Post', postSchema);
