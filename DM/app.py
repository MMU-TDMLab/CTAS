from flask import Flask
from flask import request, jsonify

import torch
from torch import nn
import pandas as pd
import numpy as np

from datasets import Features, Sequence, Value, load_dataset, load_from_disk
from transformers import (
    DPRContextEncoder,
    DPRQuestionEncoder,
    DPRQuestionEncoderTokenizerFast
)
import faiss
import operator

tokenizer = DPRQuestionEncoderTokenizerFast.from_pretrained('facebook/dpr-question_encoder-multiset-base')
model = DPRQuestionEncoder.from_pretrained('Cencoder')
model.to(torch.device('cpu'))
model.eval()
print('--- Model Loaded ---')
dataset = load_from_disk('def_index/my_knowledge_dataset/')
dataset.load_faiss_index("embeddings", 'def_index/my_knowledge_dataset_hnsw_index.faiss')


app = Flask(__name__)
app.debug = True 

@app.route("/", methods=['GET'])
def home():
    return "<center><h1>Flask web API</h1><p>Returns definitions for queries</center>"

def apply_dropout(m):
    if type(m) == nn.Dropout:
        m.train()
        m.p = 0.1 #0.1?

def getdefs(q,k):
    model.eval()
    with torch.no_grad():
        out = model(**tokenizer(q,k, max_length=128, padding='max_length', return_tensors='pt'))[0].numpy()
        predictions = dataset.get_nearest_examples('embeddings', out, 3)
        dataobj = []
        for i, (item, score) in enumerate(zip(predictions[1]['text'], predictions[0])):
            print(score)
            dataobj.append(item)
        return dataobj
    
@app.route('/DDR', methods=['GET'])
def DDR():
    if 'q' in request.args and 'k' in request.args:
        model.eval()
        query = str(request.args['q'])
        keyword = str(request.args['k'])
        out = getdefs(query, keyword)
        return jsonify({'topk':out}), 200 #http code
    else:
        return 'Error: Please specify query and keyword', 400

        
def mergeResults(predList, batch, predOut, batchList,index): ##recursive loop
    if(index < len(predList[1])):
        goTo = batch[index]['goTo']
        if(goTo == 1):
            predOut.append(predList[1][index]['text'][0])
        else:
            scores = predList[0][index:index+goTo]
            entries = predList[1][index:index+goTo]
            items = {}
            for i, entry in enumerate(entries):
                for z, pred in enumerate(entry['text']):
                    if pred in items:
                        items[pred].append(scores[i][z])
                    else:
                        items[pred] = [scores[i][z]]
            for k in items:
                items[k] = sum(items[k]) 
            best = max(items.items(), key=operator.itemgetter(1))[0] ##picks highest scoring definition for all context of target word
            predOut.append(best)
            
        batchList.append(batch[index]['string'])
        index += goTo
        return mergeResults(predList, batch, predOut, batchList, index)
    else:
        return predOut, batchList

def processBatch(q, k, batch):
    with torch.no_grad():
        out = model(**tokenizer(q,k, max_length=128, padding='max_length', return_tensors='pt'))[0].numpy()
        predictions = dataset.get_nearest_examples_batch('embeddings', out, 3)
        preds, batchList = mergeResults(predList=predictions, batch=batch, predOut=[], batchList=[], index=0)
        
        return preds, batchList
        

@app.route('/DDR-BATCH', methods=['POST'])
def DDR_BATCH():
    batches = request.json['batches']
    outputs = []
    batchLists = []
    if(batches):
        for batch in batches:
            queries = [item['query'] for item in batch]
            keys = [item['string'] for item in batch]
            preds, batchList = processBatch(queries, keys, batch)
            outputs.extend(preds)
            batchLists.extend(batchList)
        return jsonify({
            'batchLists':batchLists,
            'predictions': outputs
        }), 200
    else:
        return 'Error: invalid request', 400




if __name__ == "__main__":
    app.run()
    
    
##to split multi word definitions into two, not using this anymore
 
#            queries = [item['query'] for item in batch if len(item['string'].split()) == 1] 
#            keys = [item['string'] for item in batch if len(item['string'].split()) == 1]
#            batch_ = [item for item in batch if len(item['string'].split()) == 1]
#            
#            M_queries = [item['query'] for item in batch if len(item['string'].split()) == 2] #M = multiword
#            M1_keys = [item['string'].split()[0] for item in batch if len(item['string'].split()) == 2] #M1_ = multi word 1
#            M2_keys = [item['string'].split()[1] for item in batch if len(item['string'].split()) == 2] #M2_ = multi words 2
#            M_batch = [item for item in batch if len(item['string'].split()) == 2]
#            
#            queries.extend(M_queries+M_queries)
#            keys.extend(M1_keys+M2_keys)
#            batch_.extend(M_batch+M_batch)
#            
#            preds, batchList = processBatch(queries, keys, batch_)
#            
#            num = len(preds) - len(M_queries)*2
#            
#            preds = [f'<b>{batchList[i].split()[0]}:</b> {pred} <br> <b>{batchList[i+len(M_queries)].split()[1]}:</b> {preds[i+len(M_queries)]}' 
#                if i>num-1
#                else pred
#                for i, pred in enumerate(preds[:num+len(M_queries)])]
#                
#            batchList = batchList[:num+len(M_queries)]