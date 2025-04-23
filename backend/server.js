import express from 'express';
import mongoose from 'mongoose';
import Routing from './routing.js';
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors({
    origin: true,
    methods: ["GET", "POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type"]
}));

app.use('/api',Routing)

app.listen(3300,()=>{
    console.log('server  started suceesfully');
    
})

const connectdb = async ()=>{
    try{
        mongoose.connect('mongodb+srv://ajinnn712:wggD12dihWked8vI@cluster0.wqr9jge.mongodb.net/prescription?retryWrites=true&w=majority&appName=Cluster0')       
        console.log(' MongoDB connected successfully');
        
    }
    catch(error){
         console.log(error);
         
    }
}

connectdb();
