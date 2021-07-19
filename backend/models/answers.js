const mongoose = require('mongoose');

const answer = mongoose.Schema({
    word: {
        type:String,
        require:true
    },
    selection: {
        type:String,
        require:true
    },
    isCorrect: {
        type:Boolean,
        require:true
    },
    correctAnswer: {
        type:String,
        require:true
    }
});

const answerSchema = mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    selected_words: {
        type: Array,
        require:true
    },
    test_group: {
        type: String,
        require:true
    },
    answers: [answer],
    document_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post',
        require:true
    }
});

module.exports = mongoose.model('Answers', answerSchema);