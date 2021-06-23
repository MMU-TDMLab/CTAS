// const dataFiles = ["glove50.json","AoA.json","freq.json","syll.json"]; ///for referecne 
// embedding stucture = glove, c2v, freq, AoA, syllables, number of letters, [0,0,0] (corpus type need to remove for this model as N/A)
const nlp = require('compromise');

const ignoreList = ['et', 'al'];

class wordManager{
    constructor(word, i){
        this.word;
        this.index = i;
        this.ignore = false;
        this.embedding;
        this.tensor;
        this.complexity;
        this.tokens;
		this.freq;
        this.mwe = false;
        this.subWords = [];
        if(word.length==1){
            this.word = word[0];
            this.token = this.word;
            this.nlp = nlp(this.word);
            if(this.nlp.hyphenated().json().length){ //doesn't work for twiple+ hypens e.g multi-word-expressions
                let tokens = this.nlp.dehyphenate().text().split(" ");
                if(tokens.length == 2){
                    this.mwe = true;
                    this.tokens = tokens;
                    for(let subword of this.tokens) this.subWords.push(new wordManager([subword], this.index));
                }
            }
            //might not be best to do here
            if(this.nlp.contractions().json().length){ //nlp(`I'ven't`).contractions().expand().all().text() see what happens with this
                this.mwe = true;
                this.tokens = this.nlp.contractions().expand().all().text().split(" ");
                for(let subword of this.tokens) this.subWords.push(new wordManager([subword], this.index));
            }
            if(!this.tokens) this.token = this.token.replace(/[^a-z0-9]/g, '');
            if(this.token.length <= 1) this.ignore = true;
			else if(ignoreList.includes(this.token)) this.ignore = true;
			else if(!isNaN(parseInt(this.token))) this.ignore = true; //parse out numbers
				
        }
        else{ //collocations bigrams
            this.word = word.join(" ");
            this.mwe = true;
            this.tokens = word;
            for(let subword of word) this.subWords.push(new wordManager([subword], this.index));
        }
    }
    async loadEmbedding(dataset, c2v){
        if(!this.mwe){
            let emb = [];
            if(this.token in dataset[0])emb.push(...dataset[0][this.token]);
            else emb.push(...Array.from(Array(50),()=>0)) //Glove 50D
            //
            let c2 = await c2v.vectorize(this.token).catch(e=>{throw new Error(`Unable to vectorize characters: ${e}`)})
            emb.push(...c2);
            //
            if(this.token in dataset[2]){ emb.push(dataset[2][this.token]); this.freq = dataset[2][this.token]; }
            else{ emb.push(0.33); this.freq = 0.33; }
            //
            if(this.token in dataset[1])emb.push(dataset[1][this.token]);
            else emb.push(1);
            //
            if(this.token in dataset[3])emb.push(dataset[3][this.token]);
            else emb.push(0.44);  //use library to get value to avoid missing data
            //
            emb.push(this.token.length/10);
            //
            emb.push(...[0,0,0])
            this.embedding = emb

            return;
        }
        else{
            for(let subword of this.subWords) await subword.loadEmbedding(dataset, c2v).catch(e=>{throw new Error(`(Loading Embeddings): ${e}`)})
            this.embedding = [];
            for(let subword of this.subWords) this.embedding.push(subword.embedding);
            return;
        }
    }
}
module.exports = wordManager;

