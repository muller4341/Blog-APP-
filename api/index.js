import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


//mongoose connection
mongoose.connect(process.env.MONGO_URL)
.then (() => {
    console.log('Database connected');
})
.catch((err) => {
    console.log(err);
});


app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
    }
);

