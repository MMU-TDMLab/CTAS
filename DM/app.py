from flask import Flask
from flask import request, jsonify

import torch
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

@app.route("/", methods=['GET'])
def home():
    return "<center><h1>Flask web API</h1><p>Returns definitions for queries</center>"
    
def getdefs(q,k):
        with torch.no_grad():
            out = model(**tokenizer(q,k, max_length=128, padding='max_length', return_tensors='pt'))[0].numpy()
            predictions = dataset.get_nearest_examples('embeddings', out, 3)
            dataobj = []
            for i, (item, score) in enumerate(zip(predictions[1]['text'], predictions[0])):
                #return item
                dataobj.append(item)
            return dataobj
    
@app.route('/DDR', methods=['GET'])
def DDR():
    if 'q' in request.args and 'k' in request.args:
        query = str(request.args['q'])
        keyword = str(request.args['k'])
        out = getdefs(query, keyword)
        return jsonify({'topk':out})#out
    else:
        return 'Error: Please specify query and keyword'
    

if __name__ == "__main__":
    app.run()