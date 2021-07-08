const Tests = require('../models/test');

exports.addWord = (req, res, next) => {
    const word = new Tests({
        word: req.body.word,
        annotation: req.body.annotation,
        teacher: true,
        document_id: req.body.document_id
    });
    word.save().then(result => {
        res.status(200).json({
            message: 'Test word saved successfully!',
            result: result
        });
    }).catch(e=>{
        res.status(500).json({
            message: 'Test word not saved!'
        });
        console.log(e);
    });
}

exports.deleteWord = (req, res, next) => {
    Tests.findByIdAndRemove({
        _id: req.params.id
    }).then(result => {
        res.status(200).json({
            message: "Test Word has been deleted successfully!",
            result: result
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Test Word was not deleted!'
        })
    });
}

exports.updateWord = (req, res, next) => {
    Tests.findByIdAndUpdate({ _id: req.params.id }, 
        { $set: { annotation: req.body.annotation }}, 
        { upsert: false}, 
        (err) => {
            if (err) {
                console.log('Error Occured');
            } 
            else {
                res.status(200).json({
                    message: "Update successful!"
                });
            }
        });
}

exports.findWords = (req, res, next) => {
    Tests.find().then(documents => {
        res.status(200).json({
          message: 'Document Words fetched succesfully!',
          words: documents
        });
    });
}