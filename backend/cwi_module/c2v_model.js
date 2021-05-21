const _ = require("underscore");
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

class wordToix{
    constructor(){
        this.charToix = {'!': 0,'"': 1,'#': 2,'$': 3,'%': 4,'&': 5,"'": 6,'(': 7,')': 8,'*': 9,'+': 10,',': 11,'-': 12,'.': 13,'/': 14,'0': 15,'1': 16,'2': 17,'3': 18,'4': 19,'5': 20,'6': 21,'7': 22,'8': 23,'9': 24,':': 25,';': 26,'<': 27,'=': 28,'>': 29,'?': 30,'@': 31,'_': 32,'a': 33,'b': 34,'c': 35,'d': 36,'e': 37,'f': 38,'g': 39,'h': 40,'i': 41,'j': 42,'k': 43,'l': 44,'m': 45,'n': 46,'o': 47,'p': 48,'q': 49,'r': 50,'s': 51,'t': 52,'u': 53,'v': 54,'w': 55,'x': 56,'y': 57,'z': 58};
        this.word;
        this.vocabSize = 59;
        this.wordVec = [];
    }
    stringOneHot(word){
        return new Promise(res=>{
            this.word = word.split("");
            for(var letter in this.word){
                this.wordVec.push(this.charOneHot(this.word[letter]));
            }
            res(this.wordVec);
        });
    }
    charOneHot(letter){
        if(letter in this.charToix){
            var cArr = Array.from(Array(this.vocabSize),()=>0);
            cArr[this.charToix[letter]] = 1;
            return cArr;
        }
        else return Array.from(Array(this.vocabSize),()=>0);
    }

}

class VectorizeWords{
    constructor(){
        this.strings;
    }
    vectoriseStrings(strings){
        return new Promise((resolve,reject)=>{
            this.strings = strings;
            var pList = [];
            async function returnWord(s){
                let w2ix = await new wordToix().stringOneHot(s).catch(e=>{throw new Error("Vectorize Strings function: "+e)});
                return w2ix;
            } 
            for(let string in this.strings)pList.push(returnWord(this.strings[string]));
            Promise.all(pList).then(rslt=>resolve(rslt)).catch(e=>reject(e));
        });
    }
}

class c2vModel{
    constructor(model){
        this.model = model;
    }
    predict(vector){
        var embList = [];
        for (let i in vector){ //posible able to preduct in batch
           embList.push(this.model.predict(tf.tensor([vector[i]])).arraySync());
        }
        return embList;
    }
    async vectorize(str){
        let listStr = str;
        let wordVectorizer = new VectorizeWords();
        let charVec = await wordVectorizer.vectoriseStrings(listStr).catch(e=>{throw new Error(e)});
        let predictions = this.predict(charVec);
        //let vecObj = _.object(listStr.map((el,i)=>i.toString().concat(el)),predictions);
        return predictions[0][0]; //only processes needed for one word at a time in this use case to rewrite to return one 1d arrau of 50 to avoid [0][0]
    }
}

module.exports = c2vModel;