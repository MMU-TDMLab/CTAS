const mongoose = require('mongoose');
const uniqueVal = require('mongoose-unique-validator');

const complexWordSchema = mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true
  },
  annotation: {
    type: String,
    required: true
  },
});

complexWordSchema.plugin(uniqueVal);

module.exports = mongoose.model('Word', complexWordSchema);
