const Tests = require('../models/test');
const axios = require('axios');
const Answers = require('../models/answers');

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
                res.status(500).json({
                    success: false,
                    message: e
                });
            }
        );
    }else res.status(400).json({success:false,message:'Bad Request'});
}
/**
 * recursive loop to build array of batches as each word can have more than one context
 * @param {*} maxBatch maximun batch size (unless number of contexts for a given word > 20)
 * @param {*} batches 2D array of Batches [[CT0],[CT1]...[CT19]]
 * @param {*} CTs 1D array of CT pairs
 */
function buildCTRequest(maxBatch, batches, CTs, callback){ 
    if(CTs.length){
        let total = 0;
        let batch = [];
        while(total < maxBatch){
            if(CTs.length){
                sLen = CTs[0].query.length;
                total += sLen
                for(let i=0;i<sLen;i++){
                    batch.push({query:CTs[0].query[i], string:CTs[0].string, goTo:sLen-i});
                }
                CTs.shift();
            }else total = maxBatch;
        }
        batches.push(batch);
        buildCTRequest(maxBatch, batches, CTs, callback);
    
    }else callback(batches);

}

exports.CTpairs2 = (req, res, next) => {
    if(req.body && req.body.CT){
        const maxBatch = 15;
        let batches = [];
        buildCTRequest(maxBatch, batches, req.body.CT, batchList=>{
            axios.post('http://localhost:5000/DDR-BATCH', {'batches':batchList}).then(rslt=>{
                definitions = rslt.data.predictions.map((el, i)=>{
                    return {
                        text:rslt.data.batchLists[i],
                        definition:el
                    }
                });
                res.status(200).json({
                    success:true,
                    definitions:definitions
                });
            }).catch(error=>{
                res.status(500).json({
                    success:false,
                    message:error
                });
            })
        });
    }else res.status(400).json({success:false,message:'Bad Request'});
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

exports.saveAnswers = (req, res, next) =>{  //need auth
    let testList = req.body.map(el=>new Tests(el));
    let doc_id;
    if(testList) doc_id = testList[0].document_id;
    Tests.bulkWrite(testList.map(testEntry=>({
        updateOne: {
            filter: {_id: testEntry._id},
            update: {'$set':{answer: testEntry.answer}},
            upsert: true,
        }
    }))).then(rslt=>{
        Tests.deleteMany({
            document_id:doc_id,
            answer:''
        }).then(result=>{
            res.status(200).json({
                sucess:true,
                message:'Updated Answers'
            });
        }).catch(error=>{
            res.status(500).json({
                sucess:false,
                message:error
            })
        });
    }).catch(error=>{
        res.status(500).json({
            sucess:false,
            message:error
        })
    });
   
}

exports.stuTest = (req, res, next) =>{
    let stuAnswers = new Answers({
       user_id: req.userData.userId,
       selected_words: req.body.selectedWords,
       document_id: req.body.document_id,
       test_group: req.body.testGroup,     ///should check this
       answers: req.body.answers
    });
    Answers.create(stuAnswers).then(rslt=>{
        res.status(200).json({
            sucess:true,
            message:rslt
        });
    }).catch(error=>{
        res.status(500).json({
            sucess:false,
            message:error
        });
    });

}