const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema ({
  postId: {
    type: String
  },
  visitDate: {
    type: String
  },
  visitDurationSeconds: {
    type: Number
  }
});

module.exports = mongoose.model('Activity', visitSchema);
