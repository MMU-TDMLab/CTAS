const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema ({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to your User model
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // Reference to your Post model
  },
  visitDate: {
    type: String
  },
  visitDurationSeconds: {
    type: Number
  }
});

module.exports = mongoose.model('Activity', visitSchema);
