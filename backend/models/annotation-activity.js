const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const annotationClickSchema = new Schema ({
  word: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  postId: {
    type: String
  },
  visitDate: {
    type: String
  },
});

module.exports = mongoose.model('AnnotationClick', annotationClickSchema);
