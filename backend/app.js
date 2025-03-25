import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectdb.js';
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"


const app=express();
const port=process.env.PORT || 3000;
const DATABASE_URL=process.env.DATABASE_URL;

//cors Policy
app.use(cors());

//Database Connection
connectDB(DATABASE_URL);
//Json
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Load Routes
app.use('/api/user',userRoutes);

app.use('/api/task',taskRoutes);

app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`);
})