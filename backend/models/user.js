const mongoose = require('mongoose');
const uniqueVal = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const visitsSchema = new Schema ({
  postId: {
    type: String
  },
  visitCount: {
    type: Number,
    default: 1
  }
})

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
    type: String
  },
  visits: [visitsSchema]
});

userSchema.plugin(uniqueVal);

module.exports = mongoose.model('User', userSchema);
