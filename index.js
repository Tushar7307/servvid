const mongoose =  require('mongoose');
const express = require('express');
const app = express();
const users = require('./routes/users');


mongoose.connect('mongodb://localhost/servvid',{ useUnifiedTopology: true ,useNewUrlParser: true })
.then(()=>console.log('mongodb is connected..'))
.catch(err =>console.log('mongodb is connected....',err))

app.use(express.json());

app.use('/',users)


app.listen(3000,()=>{
  console.log('lisining on port 3000....');
});