import dotenv from 'dotenv'
import express from 'express'
import connectDb from './db/index.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config();

const app=express();
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({limit:'16kb'}));// 
app.use(express.urlencoded({extended:true,limit:"16kb"}))// url se bhi data ayega uske liye h 
app.use(cookieParser());// cookies read karne ke liye
app.use(express.static("public"))

import useRouter from './Routes/Users.route.js'
import hospitalRouter from './Routes/Hospitals.route.js'
import postRouter from './Routes/Post.route.js'
import commentRouter from './Routes/Comment.route.js'

app.use("/api/v1/user",useRouter);
app.use("/api/v1/hospital", hospitalRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

export {app}