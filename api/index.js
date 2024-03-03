
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import userRouter from './routes/userrouter.js';
import auth from './routes/auth.js';

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
app.use('/api/user', userRouter);
app.use('/api/auth', auth);
app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
    }
);

