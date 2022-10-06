const bodyParser = require('body-parser')
const express = require('express')
const dontEnv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()
dontEnv.config();
app.use(bodyParser.json())

app.use(routes)

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true},()=>{
    console.log(mongoose.connection.readyState)
    console.log('connected to DB')

    app.listen(3000,()=> console.log('Server is running...'))

})

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
  });

