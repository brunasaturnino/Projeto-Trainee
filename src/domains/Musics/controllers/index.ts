import { Router, Request, Response, NextFunction } from "express";
import musicsService from "../services/musicsService";
import { checkRole, verifyJWT } from "../../../middlewares/auth";
import statusCodes from "../../../../utils/constants/statusCode";

const router : Router = Router();
const musicService = new musicsService();

router.get("/musics", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await musicService.getMusics();
        res.status(statusCodes.ACCEPTED).json(musics);
    } catch (error) {
        next(error);
    }
});

router.get("/musics/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const music = await musicService.getMusicById(Number(id));
        res.status(statusCodes.ACCEPTED).json(music);
    } catch (error) {
        next(error);
    }
});

router.post("/musics/create", verifyJWT, checkRole, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = req.body;
        await musicService.createMusic(music);
        res.status(statusCodes.CREATED).send();
    } catch (error) {
        next(error);
    }
});

router.put("/musics/update/:id", verifyJWT, checkRole, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const music = req.body;
        await musicService.updateMusicById(Number(id), music);
        res.status(statusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
});

router.delete("/musiscs/delete/:id", verifyJWT, checkRole, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await musicService.removeMusicById(Number(id));
        res.status(statusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
});

router.get("/musics/artist/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const musics = await musicService.getAllMusicsByArtistId(Number(id));
        res.status(statusCodes.ACCEPTED).json(musics);
    }catch(error){
        next(error);
    }
});

export default router; 
