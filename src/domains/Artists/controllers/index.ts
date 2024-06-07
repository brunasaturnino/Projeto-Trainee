import { Router, Request, Response, NextFunction } from "express";
import artistsService from "../services/artistsService";
import { checkRole, verifyJWT } from "../../../middlewares/auth";
import statusCodes from "../../../../utils/constants/statusCode";
import {InvalidParamError} from  "../../../../errors/errors/InvalidParamError"; 
import {InvalidRouteError} from  "../../../../errors/errors/InvalidRouteError"; 


const router: Router = Router();
const service = new artistsService();

router.post('/', verifyJWT, checkRole, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.name || !req.body.genre) {
            throw new InvalidParamError("Name and genre are required");
        }
        const artist = await service.createArtist(req.body);
        res.status(statusCodes.CREATED).json(artist);
    } catch (error) {
        next(error);
    }
});

router.get("/artists", verifyJWT, async(req: Request, res: Response, next: NextFunction) => {
    try{
        const artists = await service.getAllArtists();
        res.status(statusCodes.SUCCESS).json(artists);
    }catch(error){
        next(error);
    }
});

router.get('artists/:id', verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artistId = Number(req.params.id);
        if (isNaN(artistId)) {
            throw new InvalidParamError("Invalid artist ID");
        }
        const artist = await service.getArtistById(artistId);
        if (artist) {
            res.status(statusCodes.SUCCESS).json(artist);
        } else {
            throw new InvalidRouteError("Artist not found");
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id', verifyJWT, checkRole, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artistId = Number(req.params.id);
        if (isNaN(artistId)) {
            throw new InvalidParamError("Invalid artist ID");
        }
        const updatedArtist = await service.updateArtistById(artistId, req.body);
        res.status(statusCodes.SUCCESS).json(updatedArtist);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', verifyJWT, checkRole, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artistId = Number(req.params.id);
        if (isNaN(artistId)) {
            throw new InvalidParamError("Invalid artist ID");
        }
        const artist = await service.removeArtistById(artistId);
        res.status(statusCodes.SUCCESS).json(artist);
    } catch (error) {
        next(error);
    }
});

export default router;
