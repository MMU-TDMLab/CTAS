const mongoose = require('mongoose');
// const uniqueVal = require('mongoose-unique-validator');

const documentWordSchema = mongoose.Schema({
  word: {
    type: String,
    required: true,
    // unique: true
  },
  annotation: {
    type: String,
    required: true
  },
  document_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', required: true
  }
});

// documentWordSchema.plugin(uniqueVal);

module.exports = mongoose.model('DocumentWord', documentWordSchema);
