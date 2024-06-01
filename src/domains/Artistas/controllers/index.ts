import { Router, Request, Response, NextFunction } from "express";
import artistasService from "../services/artistasService";

const router = Router();
const service = new artistasService();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = await service.createArtista(req.body);
        res.status(201).json(artist);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = await service.getArtistById(Number(req.params.id));
        if (artist) {
            res.status(200).json(artist);
        } else {
            res.status(404).json({ error: 'Artist not found' });
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedArtist = await service.updateArtistById(Number(req.params.id), req.body);
        res.status(200).json(updatedArtist);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = await service.removeArtistById(Number(req.params.id));
        res.status(200).json(artist);
    } catch (error) {
        next(error);
    }
});

export default router;
