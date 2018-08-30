const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema ({
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  postId: {
    type: String
  },
  visitDate: {
    type: String
  },
  visitDurationSeconds: {
    type: String
  }
});

module.exports = mongoose.model('Activity', visitSchema);
