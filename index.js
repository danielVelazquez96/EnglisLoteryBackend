const express=require('express');
const app=express();
const port=5000;
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

// const path=require('path');

// app.use(express.static(path.join(__dirname,'../public/')));

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//mongoose
mongoose.connect('mongodb+srv://Daniel:LoteryEnglish@cluster0.gn9gp.mongodb.net/Version1?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});


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

// Listen

app.listen(port,()=>{
    console.log(`${port} conected`);
});


