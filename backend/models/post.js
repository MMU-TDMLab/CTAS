const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  header: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);
