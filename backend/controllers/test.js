const Tests = require('../models/test');
const axios = require('axios');

exports.getTests = (req, res, next) => {
    Tests.find().then(docs => {  
        res.status(200).json({
            sucess:true,
            testList: docs
        });
    }).catch(err => res.status(400).json({sucess:false, message:err}));
}

exports.CTpairs = (req, res, next) => {
    if(req.body){
        axios.post('http://localhost:5000/MC-DDR', {'CT':req.body})
            .then(result =>{
                console.log(result.data)
                res.status(200).json({
                    message: 'success',
                    data: result.data
                });
            })
            .catch(e =>{
                console.error(e)
                res.status(400).json({
                    message: e
                });
            }
        );
    }
}

exports.saveTest = (req, res, next) =>{
    let testList = req.body.map(el=> new Tests(el));
    Tests.insertMany(testList).then(rslt=>{
        res.status(200).json({sucess:true});
    }).catch(err=>{
        res.status(400).json({sucess:false});
    });
    
}

exports.deleteTest = (req, res, next) =>{  //need auth here!!!
    let id = req.params.id
    
    Tests.deleteMany({
        document_id:id
    }).then(rslt=>{
        res.status(200).json({
            sucess:true,
            message:'Deleted Test'
        });
    }).catch(err=>{
        res.status(500).json({
            sucess:false,
            message:err
        });
    });
    
}

exports.getAnswers = (req, res, next) =>{
   
}