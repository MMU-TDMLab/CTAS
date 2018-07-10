const mongoose = require('mongoose');
const uniqueVal = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  answers: {
    type: String,
    // required: true
  }
});

userSchema.plugin(uniqueVal);

module.exports = mongoose.model('User', userSchema);
