const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const wordManager = require('./wordManager');
const Tag = require("en-pos").Tag; //https://github.com/FinNLP/en-pos
const regex = /[^a-zA-Z]/g;

class sentenceMagager{
    constructor(sentence){
        this.sentence = sentence;
        this.wordList = sentence.split(" ").filter(s=>s!=''); //.map(el=>el.replace(/[)(]/g,""))//remove brackets, issues with brackets;
		this.POS = new Tag(this.wordList).initial().smooth().tags    //remove smooth for slightly faster (not much)
        this.words = [];
        if(this.wordList.length>1) this.findCollocations(); //  detect references or full stops inside brackets, causing problems
        else this.wordList[0] = [this.wordList[0]];
        this.constructWords();
    }
    findCollocations(){ //bigrams only // misses stuff like ['embedding:']// makes words that are in a row be counted twice when contexts are added up   
        let adj = ["JJ","JJR","JJS"];
        let noun = ["NN","NNS","NNP","NNPS"];
        let newWordList = [];
        for(let i=0; i<this.wordList.length; i++){ 

            if(i == this.wordList.length-1){
                if(newWordList[newWordList.length-1].length == 1 || newWordList[newWordList.length-1][1] != this.wordList[i]){
                    newWordList.push([this.wordList[i]]); 
                }break;
            } // avoid out-of index

            let cur = this.wordList[i]; let nxt = this.wordList[i+1]; let curPOS = this.POS[i]; let nxtPOS = this.POS[i+1];
            if(nxt.replace(regex,'').length != nxt.length){
                newWordList.push([cur],[nxt]);
                i++; continue;
            } 
            if(cur.replace(regex,'').length != cur.length){
                newWordList.push([cur]);
                continue; //ignore any possible contractions brackets or hyphenated words
            }
            if(adj.includes(curPOS) && noun.includes(nxtPOS) || noun.includes(curPOS) && noun.includes(nxtPOS)){
                //bigram collocation filter
                //newWordList.push(cur.concat(` ${nxt}`));
                //newWordList.push([i,i+1]);
                newWordList.push([cur,nxt]);
            }
            //else newWordList.push(i);
            else {
                if(newWordList.length == 0 || newWordList[newWordList.length-1].length == 1 || newWordList[newWordList.length-1][1] != cur) {
                    newWordList.push([cur]);
                }
            }
        } 
        this.wordList = newWordList;
    }
    constructWords(){
        for(let i=0; i<this.wordList.length; i++) {
            this.words.push(new wordManager(this.wordList[i],i))
        }
        this.words = this.words.filter(el=>!el.ignore);
    }
    async loadEmbeddings(datasets, c2v){
        for(let word of this.words) await word.loadEmbedding(datasets, c2v).catch(e=>{throw new Error(`(Loading Embeddings): ${e}`)})
        return;
    }
    loadTensors(model, mwModel){
        for(let word of this.words){
			if(!word.mwe && word.freq > 0.75){
				word.complexity = 0;
				continue; //Save Compute by skipping words with high frequencies.
			}
			
            let index = word.index
            let left = this.words.slice(0,index)
            let right = this.words.slice((index + 1));
            let leftEmbs;
            let rightEmbs;

            const reducer = (acc,cur) =>{ // words with subwords contain list of embeddings, this flattens list while not flattenning other elements
                if(cur[0].length) for(let arr of cur) acc.push(arr)
                else acc.push(cur);
                return acc;
            }

            if(left.length) leftEmbs = tf.tensor(left.map(el=>el.embedding).reduce(reducer,[])).mean(0);
            else leftEmbs = tf.zeros([107]);
           
            if(right.length) rightEmbs = tf.tensor(right.map(el=>el.embedding).reduce(reducer,[])).mean(0);
            else rightEmbs = tf.zeros([107]);
            //
            if(!word.mwe){
				console.log(word.token);
				let emb = tf.tensor(word.embedding);
				let tensor = tf.stack([leftEmbs,emb,rightEmbs]).expandDims(0);
				word.tensor = tensor;
				word.complexity = model.predict(word.tensor).dataSync(0)[0];
            }
            else{
                let emb1 = tf.tensor(word.subWords[0].embedding).expandDims(0).expandDims(0);
                word.subWords[0].tensor = emb1
                let emb2 = tf.tensor(word.subWords[1].embedding).expandDims(0).expandDims(0);
                word.subWords[1].tensor = emb2
                leftEmbs = leftEmbs.expandDims(0).expandDims(0);
                rightEmbs = rightEmbs.expandDims(0).expandDims(0);
                word.tensor = [leftEmbs,emb1,emb2,rightEmbs];
                word.complexity = mwModel.predict(word.tensor).dataSync(0)[0];
            }
        }
    }
}
module.exports = sentenceMagager;