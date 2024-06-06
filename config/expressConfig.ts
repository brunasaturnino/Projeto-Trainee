import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, {Express} from "express";
import cookieParser from "cookie-parser";

import userRouter from "../src/domains/Users/controllers/index";
import artistRouter from "../src/domains/Artists/controllers/index";
import musicRouter from "../src/domains/Musics/controllers/index";

dotenv.config();

export const app: Express = express();

const options: CorsOptions = {
    credentials: true,
    origin: process.env.APP_URL
}

app.use(cors(options));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/users", userRouter);  
app.use("/api/artists", artistRouter);  
app.use("/api/musics", musicRouter);  