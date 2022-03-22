// Cloudinary
import  cloudinary  from './utils/cloudinary.js';

import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';



// const path=require('path');

const app=express();
const PORT=process.env.PORT||5000
dotenv.config();

// bodyParser
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

//mongoose

mongoose.connect(process.env.CONNETCION_URL,{useNewUrlParser:true,useUnifiedTopology:true});


const connection =mongoose.connection; 

connection.once('open',()=>{
    console.log('BD conected');
})

connection.on('error',(err)=>{
    console.log(`BD cannot conect ${err}`);
})

// mongo model
const Lotery=mongoose.model("version1",{number: Number,name: String,url: String});

// endpoint get
app.get('/getData',(req,res)=>{
    
    Lotery.find()
        .then(doc=>{
            res.json(doc);
        })
        .catch(err=>console.log(`Failed to download data err: ${err}`));
})

app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            englishLoteryPublic: 'englishLoteryPublic',
        });
        res.send(uploadResponse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }   
});



app.get('/',(req,res)=>{
    res.json('Hello, API works');
})

// Listen

app.listen(PORT,()=>{
    console.log(`${PORT} conected`);
});


