import { Router, Request, Response, NextFunction } from "express";
import musicasService from "../services/musicasService";

const router = Router();
const musicService = new musicasService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await musicService.getMusics();
        res.json(musics);
    } catch (error) {
        next(error);
    }
});

