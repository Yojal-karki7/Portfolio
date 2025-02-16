import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/Error.js";
import messageRouter from './routes/messageRoute.js'
import userRouter from './routes/userRoute.js'
import timelineRouter from './routes/timelineRoute.js'
import softwareApplicationRouter from './routes/softwareApplication.js'
import skillRoutes from './routes/skillRoutes.js'
import projectRoutes from './routes/projectRoutes.js'


const app = express();
dotenv.config({path: './config/config.env'})


app.use(cors({
    origin: ["https://portfolio-swart-two-42.vercel.app", 
            "http://localhost:5173"],
    methods: ["GET","POST","DELETE", "PUT"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

// routes
app.use('/api/v1/message', messageRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/timeline', timelineRouter)
app.use('/api/v1/softwareapplication', softwareApplicationRouter)
app.use('/api/v1/skill', skillRoutes)
app.use('/api/v1/project', projectRoutes)

// middlewares
dbConnection();
app.use(errorMiddleware);


export default app