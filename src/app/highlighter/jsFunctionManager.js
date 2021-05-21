
export class highlightWords{
    constructor(highlightManager, difficultWords){
        this.highlightManager = highlightManager;
        this.difficultWords = difficultWords;
    }
    apply(type = 'optional'){
        if(type != 'optional')this.difficultWords = this.difficultWords.filter(el=>typeof(el)==="string");
        
        this.difficultWords.sort((a,b)=>a.length-b.length); //sort by ascending length, match longest case of a phrase
    
        for(let token of this.difficultWords){
            this.highlightManager.findTokens(token).highlight(type);
        }
        this.highlightManager.buildDoc();
    }
}