import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, {Express} from "express";


const userRouter = require('../src/domains/Usuarios/controllers/index')

dotenv.config();

export const app: Express = express();

const opstions: CorsOptions = {
    credentials: true,
    origin: process.env.APP_URL
}

app.use(cors(opstions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);  