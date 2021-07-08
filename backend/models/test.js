const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    word: {
        type: String,
        required: true,
    },
    annotation: {
        type: String,
        required: false
    },
    teacher: {
        type: Boolean,
        required: true
    },
    document_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
});

module.exports = mongoose.model('Test', testSchema);