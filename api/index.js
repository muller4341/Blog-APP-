
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import userRouter from './routes/userRouter.js';
import auth from './routes/auth.js';
import cookieParser from 'cookie-parser';
import postRoute from './routes/postRoute.js';

const app = express();

dotenv.config();

//mongoose connection

mongoose.connect(process.env.MONGO_URL)
.then (() => {
    console.log('Database connected');
})
.catch((err) => {
    console.log(err);
});
//middleware
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter);
app.use('/api/auth', auth);
app.use('/api/post', postRoute);
app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
    }
);


// creation of middleware 
app.use((error, req, res, next) => {

    const statusCode = error.statusCode || 500;
    const message = error.message|| 'internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })



});



