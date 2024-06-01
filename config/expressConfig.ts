import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, {Express} from "express";

dotenv.config();

export const app: Express = express();

const opstions: CorsOptions = {
    credentials: true,
    origin: process.env.APP_URL
}

const userRouter = require('../src/domains/Usuarios/controllers/index')


app.use('/users', userRouter);  

app.use(cors(opstions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));