const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const documentsWordsRoutes = require('./routes/documentWords');
const analyticsRoutes = require('./routes/analytics');

const app = express();
console.log(process.env.MONGO_ATLAS_NAME);
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb+srv://" + process.env.MONGO_ATLAS_NAME + ":" + process.env.MONGO_ATLAS_PW + "@cluster0.4uxns.mongodb.net/ctasDB?retryWrites=true&w=majority", { useNewUrlParser: true })
.then(() => {
    console.log('Connected to the database!')
  })
  .catch(() => {
    console.log('Connection failed')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/documentWords', documentsWordsRoutes);
app.use('/api/analytics', analyticsRoutes);

module.exports = app;
