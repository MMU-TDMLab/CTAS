const mongoose = require('mongoose');
const uniqueVal = require('mongoose-unique-validator');
// const Schema = mongoose.Schema;

const visitCountSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // Reference to your Post model
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
  visits: [visitCountSchema]
  // visits: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'UserClicks', // Reference to your UserClicks model
  //   }]
});

userSchema.plugin(uniqueVal);

module.exports = mongoose.model('User', userSchema);
