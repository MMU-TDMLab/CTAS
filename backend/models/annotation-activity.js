const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const annotationClickSchema = new Schema ({
  word: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  visitDate: {
    type: String
  },
});

module.exports = mongoose.model('AnnotationClick', annotationClickSchema);
