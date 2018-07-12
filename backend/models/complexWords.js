const mongoose = require('mongoose');
const uniqueVal = require('mongoose-unique-validator');

const complexWordSchema = mongoose.Schema({
  complexWord: {
    type: String,
    required: true,
    unique: true
  },
  annotation: {
    type: String,
    required: true
  },
});

userSchema.plugin(uniqueVal);

module.exports = mongoose.model('Complex', complexWordSchema);
