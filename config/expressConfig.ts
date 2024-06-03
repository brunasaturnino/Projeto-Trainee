import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, {Express} from "express";

const userRouter = require("../src/domains/Users/controllers/index");
const artistRouter = require("../src/domains/Artists/controllers/index");
const musicRouter = require("../src/domains/Musics/controllers/index");

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
app.use('/artists', artistRouter);  
app.use('/musics', musicRouter);  