/*
This Class loads the tensorflow model and makes preductions based on tensors retrieved from sentence2Tensor.js class
*/
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const fs = require("fs");
const path = require("path");
const c2vModel = require('../cwi_module/c2v_model');
const dataFiles = ["glove50.json","AoA.json","freq.json","syll.json"];

class cwi_model{
    constructor(){
        [this.model,this.c2v,this.datasets, this.mwModel] = [false,false,false,false];
        this.loadModel().then(()=>console.log("Model Loaded")).catch(e=>console.error(e));
        this.fileLoop(rslt=>{if(rslt)this.datasets = rslt});
    }
    ready(){
        if(this.model && this.datasets && this.c2v)return true;
        else return false;
    }
    async loadModel(){
        this.model = await tf.loadLayersModel("file://backend/cwi_module/CNNjs/model.json");
        this.c2v = new c2vModel(await tf.loadLayersModel("file://backend/cwi_module/c2vJS/model.json"));
        this.mwModel = await tf.loadLayersModel("file://backend/cwi_module/CNNMWEjs/model.json");
    }
    filereader(file){
        return new Promise((res,rej)=>{
            fs.readFile(path.join(__dirname,"/datasets/"+file),(err,data)=>{
                if(err)rej(err);
                else res(JSON.parse(data));
            });
        });
    }
    fileLoop(cb){
        var promiseList = [];
        dataFiles.forEach(file=>{
            promiseList.push(this.filereader(file));
        });
        Promise.all(promiseList).then(rslt=>cb(rslt)).catch(e=>console.error(e),cb(false));
    }
}


module.exports = cwi_model;