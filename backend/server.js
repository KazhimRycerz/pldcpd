import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import express from 'express'
//import "dotenv/config"
//import cors from 'cors'
import app from './app.js';

dotenv.config()

const connectDB = async () =>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qcyipp2.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`)   
        console.log("Connected to user in Mongo Atlas)")
    } catch (error) {
        console.error(error)
    }
}

connectDB()

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
})