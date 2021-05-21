const sentenceMagager = require('./sentenceManager');

class documentManager{
    constructor(document){
        this.document = document
        this.sentenceList = document.replace(/\r?\n|\r/g, " ").split(".").filter(s=>s!=" ").map(s=>s.trim().replace(/[,"/!?]/g,"").trim()).filter(s=>s!="");
        this.sentences = [];
        this.constructSentences();
        this.CWImodel; 
    }
    constructSentences(){
        for(let sentence of this.sentenceList){
            this.sentences.push(new sentenceMagager(sentence))
        }
    }
    async process(CWImodel){
        this.CWImodel = CWImodel;
        if(this.CWImodel.ready()){
            for(let sentence of this.sentences) await sentence.loadEmbeddings(this.CWImodel.datasets, this.CWImodel.c2v).catch(e=>{throw new Error(e)});
            for(let sentence of this.sentences) sentence.loadTensors(this.CWImodel.model, this.CWImodel.mwModel);
            return;
        }
        else{
            await this.CWImodel.loadModel().catch(e=>{throw new Error(`Unable to load Models: ${e}`)})
            this.CWImodel.fileLoop(rslt=>{
                if(rslt){
                    this.CWImodel.datasets = rslt
                    this.process(this.CWImodel)
                }
                else throw new Error("Unable to load datasets");
            });
        }
    }

}
module.exports = documentManager;