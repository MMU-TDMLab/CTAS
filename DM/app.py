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

def mergeQueries(out, batch, batchOut, batchList,index): ##recursive loop
    if(index < len(out)):
        goTo = batch[index]['goTo']
        if(goTo == 1):
            batchOut.append(out[index].numpy())
        else:
            toMerge = out[index:index+goTo]
            newVec = torch.mean(out, dim=0).numpy()
            batchOut.append(newVec)
        batchList.append(batch[index]['string'])
        index += goTo
        return mergeQueries(out, batch, batchOut, batchList, index)
    else:
        return np.array(batchOut), batchList

def processBatch(q, k, batch):
    with torch.no_grad():
        out = model(**tokenizer(q,k, max_length=128, padding='max_length', return_tensors='pt'))[0]
        rslt, batchList = mergeQueries(out=out, batch=batch, batchOut=[], batchList=[], index=0)
        predictions = dataset.get_nearest_examples_batch('embeddings', rslt, 1)
        preds = [predictions[1][i]['text'][0] for i in range(len(rslt))]
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


############################################################No longer using below..
retr = 2
reps = 2
minLen = 2   
sMax = torch.nn.Softmax(dim=0)
from statistics import stdev  ##move all this to top!!
from math import sqrt

'''
TO-DOs:
improve parsing of both CWs and in highlighter, i.e matched fixed case
add Authorization errors for deleting tests like in posts 
'''

def getMCdefs(qs, ks):
    with torch.no_grad():
        out = model(**tokenizer(qs, ks, max_length=128, padding='max_length', return_tensors='pt'))[0].numpy()
        predictions = dataset.get_nearest_examples_batch('embeddings', out, retr)
        results = {}
        for entry in range(reps):
            items, scores = [], []
            for i, (item, score, emb) in enumerate(zip(predictions[1][entry]['text'], predictions[0][entry], predictions[1][entry]['embeddings'])):
                items.append(item)
                scores.append(score)
            scores = sMax(torch.tensor(scores)).numpy().tolist()
            for i, (item, score) in enumerate(zip(items, scores)):
                if item in results:
                    results[item]['scores'].append(score)
                    results[item]['ranks'].append(i)
                else:
                    results[item] = {'scores': [score], 'ranks': [i]}
        for k in results:
            results[k]['scores'].extend([0 for x in range(reps-len(results[k]['scores']))])
            results[k]['ranks'].extend([reps for x in range(reps-len(results[k]['ranks']))])
            results[k]['average'] = sum(results[k]['scores'])/reps
            results[k]['average_rank'] = retr - sum(results[k]['ranks'])/reps

            results[k]['rank_std'] = stdev(results[k]['ranks'])
            results[k]['R-CV'] = (results[k]['rank_std']/results[k]['average_rank'])*100
            results[k]['R-SE'] = results[k]['rank_std']/sqrt(reps)

    results = dict(sorted(results.items(), key=lambda item: item[1]['average'], reverse=True))
    return results
'''
Fills up arrays of q and k to a min len of 10 of randomly selected q's 
--TO-FIX- I think this'll cause a bug for a word that is featured more than 10 times
'''
def populate(ct):
    reps = minLen
    queries = ct['query']
    qLen = len(ct['query'])
    print(f'Qlen: {qLen}')
    if(qLen < minLen):
        indexes = np.random.randint(qLen, size=minLen - qLen)
        for i in indexes:
            queries.append(queries[i])
    else:
        reps = qLen #This may fix this ------------------
    keys = [ct['string'] for k in queries]
    return queries, keys

from os import system as sys

@app.route('/MC-DDR', methods=['POST'])
def MCDDR():
    #model.apply(apply_dropout)
    model.eval()
    print()
    queries, keys = populate(request.json['CT'])
    print(keys[0])
    results = getMCdefs(queries, keys)
    p_key = next(iter(results))
    
    return jsonify({
        'Text':keys[0],
        'Prediction':p_key,
        'Data':results[p_key]
    }), 200

if __name__ == "__main__":
    app.run()