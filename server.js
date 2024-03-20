const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const router = require('./routes/Noteroutes')
const PORT = 4001
const app = express();

env.config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.log('Failed to connect to MongoDB'+ err.message);
})

app.use(express.json());
app.use('/', router)

app.listen(PORT, ()=>{
    console.log(`Server is Running on Port : ${PORT}`)
})

