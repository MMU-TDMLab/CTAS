export class highlightManager{
    constructor(element){
        this.element = element;
        this.document = this.element.innerHTML;;
        this.docUncased;
        this.docChars = this.document.split("");
        this.obj = [];
        this.buildObj();
        this.occurs;
        this.optional = '<a class="optional" style="text-decoration:none; color:blue">'
        this.clickable = '<a class="clickable" style="background-color: yellow; text-decoration: none; cursor:pointer;">'
    } //we should store highlighted words;
    buildObj(){
        for(let i in this.docChars){
            let cur = {
                "tagged":false,
                "formatting":"",
                "pre":"",
                "char":this.docChars[i],
                "post":"",
            }
            this.obj.push(cur);
        }
        let tempObj = [];

        for(let i=0; i<this.obj.length;i++){
            if(i!=this.obj.length-1){
                if(this.obj[i].char.match(/\r?\n|\r/ig)){
                    this.obj[i+1].formatting = `${this.obj[i].formatting}${this.obj[i].char}`;
                    if(this.obj[i-1].char.trim().length && this.obj[i+1].char.trim().length) this.obj[i].char = " "; //document may contain a newline and no space break between words causing non match
                    else {
                        continue;
                    }
                } //newlines // adds non important characters to the next words formatting attribute
                if(!this.obj[i].char.trim().length && !this.obj[i+1].char.trim().length){this.obj[i+1].formatting = `${this.obj[i].formatting}${this.obj[i].char}`; continue;} //store but remove double whitespaces
                tempObj.push(this.obj[i]); //continue statements are used if the above conditions are met
            }else tempObj.push(this.obj[i]);
        }
        this.obj = tempObj;
        this.document = this.obj.map(el=>el.char).join('');
        this.docUncased = this.document.toLowerCase();
    }
    findTokens(_word){
		
        let word = _word.toLowerCase().replace(/[)(]/g,""); //remove brackets, issues with brackets;
        let occurs =  [...this.docUncased.matchAll(word)].map(el=>[el.index,el.index+el[0].length]);
        this.occurs = occurs;
        return this;
    }
    highlight(type){ 
        let highlightClass;
        switch(type){
            case 'optional':
                highlightClass = this.optional;
                break;
            case 'clickable':
                highlightClass = this.clickable;
        }
        for(let index of this.occurs){
            let i1 = index[0]; let i2 = index[1];
			if(type == 'optional'){ //allow subwords that have been manually annotated
				if(i1!=0 && this.obj[i1-1].char.match(/['’a-z—–-]/ig) || i2!=this.obj.length && this.obj[i2].char.match(/['’a-z—–-]/ig)){
					continue; //don't want to match subwords i.e because shoudn't have cause highlighted
				}
			}
            let toHighlight = this.obj.slice(...index);
            for(let el of toHighlight){
                el.tagged = false;
                el.pre='';
                el.post='';
            }
            toHighlight[0].pre = highlightClass;

            if(highlightClass == this.clickable) toHighlight[toHighlight.length-1].post = '</endClickable>';
            else toHighlight[toHighlight.length-1].post = '</a>'; 

            for(let char of toHighlight) char.tagged = true;
        }
        return this;
    }

    buildDoc(){
        let newDoc = this.obj.map(el=>{
            let post = el.post;
            if(el.post == '</endClickable>')post = '</a>';
            return [el.formatting,el.pre,el.char,post];
        }).flat(1).join("");

        this.element.innerHTML = newDoc;
    }
    reset(){
        this.obj = this.obj.map(el=>{
            let pre = "";
            let post = "";
            if(el.pre == this.clickable) pre = ''//this.clickable;
            if(el.post == '</endClickable>')post = ''//</endClickable>';
            return {
                "tagged":false,
                "formatting":el.formatting,
                "pre":pre,
                "char":el.char,
                "post":post,
            }
        });   
        this.buildDoc();
    }
	
	
	getItemIndex(start_,word){  //for grabbing word in context for definition selection
		//console.log(start_);
		let at = 0
		let strings = []
		let start = null
		let end = null
		let periods = [null,null]
		
		for(let key in this.obj){
			let cur = this.obj[key]

			if(start==null && cur.char == '.'){
				periods[0] = parseInt(key)+1;
			}
			if(start!=null && cur.char == '.'){
				periods[1] = parseInt(key)+1;
				break;
			}
			for(let i=0; i<cur.formatting.length+1;i++){
				if(start == null && at == start_){
					start = parseInt(key);
				}
				at += 1
			}
			if(cur.char == '&'){ //Implement for other characters that render differently i.e & = &amp;
				start_+=4;
			}
		}
		console.log(start);
		return {'query':this.document.substr(start,word.length),'string':this.document.substr(periods[0],periods[1]-periods[0])}
		
	}
}
