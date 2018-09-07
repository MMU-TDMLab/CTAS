const mongoose = require('mongoose');
const uniqueVal = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const visitsSchema = new Schema ({
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
  visits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visits', // Reference to your Visit model
    }]
});

userSchema.plugin(uniqueVal);

module.exports = mongoose.model('User', userSchema);
// module.exports = mongoose.model('Post', postSchema);
module.exports = mongoose.model('Visits', visitsSchema);
