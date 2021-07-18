/*
    Used for annotations and selected complex words for the testing interface
*/
export interface testEntry {
    _id?: string;
    teacher: boolean,
    word: string;
    answer?: string;
    annotation: string;
    document_id: string;
}

export interface testIdEntry {
    doc_id:string;
    answered:boolean;
}

export interface CTpair {'query': string[], 'string': string};

export interface Definition {'text': string, 'definition':string};


export interface Answer {
    word:string;
    selection:string;
    isCorrect:boolean;
    correctAnswer:string;
}
/**
 *  Stores details of students test ##Look at using local storage aswell for this!
 * @param testGroup stores which testing group the student is in 
 * @param selectedWords stores words the student has selected in the pretest
 * @param document_id id of test document
 */
export interface studentTestDetails {
    testGroup:string;
    selectedWords: string[];
    answers?: Answer[];
    document_id: string;
}

/**
 * Stores a prediction for a text in context
 * 
 * 'data.R-CV': Rank Coefficient of Variance
 * 
 * 'data.R-SE': Rank Standard Error
 */
export interface Prediction {
    message:string,
    data:{
        'R-CV':number,
        'R-SE':number,
        'average':number,
        'average_rank':number,
        'rank_std':number,
        'ranks':number[],
        'scores':number[],
        'Prediction':string,
        'Text':string
    }
}