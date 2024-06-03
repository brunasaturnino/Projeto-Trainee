import { Router, Request, Response, NextFunction } from "express";
import musicsService from "../services/musicsService";

const router : Router = Router();
const musicService = new musicsService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await musicService.getMusics();
        res.json(musics);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const music = await musicService.getMusicById(Number(id));
        res.json(music);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = req.body;
        await musicService.createMusica(music);
        res.status(201).send();
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const music = req.body;
        await musicService.updateMusicById(Number(id), music);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await musicService.removeMusicById(Number(id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});



export default router; 
