/*
    Used for annotations and selected complex words for the testing interface
*/
export interface testEntry {
    id?: string;
    teacher: boolean,
    word: string;
    annotation: string;
    document_id: string;
}

export interface CTpair {'query': string[], 'string': string};

export interface Definition {'text': string, 'definition':string};

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