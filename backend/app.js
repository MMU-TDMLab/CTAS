const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const wordsRoutes = require('./routes/words');

//load config file
const config = require('../config/config');

const app = express();

// mongoose.connect(`mongodb+srv://${config.name}:${config.pw}@cluster0-hhltm.mongodb.net/node-angular`)
// mongoose.connect(`mongodb://${config.name}:${config.pw}@ds161700.mlab.com:61700/angular-file-system`)
mongoose.connect("mongodb://" + process.env.MONGO_ATLAS_NAME + ":" + process.env.MONGO_ATLAS_PW + "@ds161700.mlab.com:61700/angular-file-system")
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
app.use('/api/words', wordsRoutes);

module.exports = app;
