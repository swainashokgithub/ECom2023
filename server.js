//const express = require('express')
//const colors = require ('colors')
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import cors from "cors"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
// used for deployment time
import path from "path";
import {fileURLToPath} from "url";

//configure env
dotenv.config();

//database config
connectDB();

//esmodules fix used deployment time
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//used for deployment
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes)

//rest api

// app.get("/", (req, res) => {
//     res.send("<h1>Welcome to ecommerce app</h1>");
// });

//used deployment time
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})


