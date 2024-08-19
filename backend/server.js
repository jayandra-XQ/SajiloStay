import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import uploadRoutes from './routes/upload.routes.js';


import connectMongoDB from './db/connectMongoDB.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

app.use(express.json());
app.use(cookieParser());
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth' , authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/upload', uploadRoutes);


app.listen(PORT, ()=> {
  console.log(`server running at port ${PORT}`);
  connectMongoDB();
})