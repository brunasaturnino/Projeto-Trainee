import { Router, Request, Response, NextFunction } from "express";;
import usersService from "../services/usersService";
import { ObjectEnumValue } from "@prisma/client/runtime/library";
import { Users } from "@prisma/client";
import { login, verifyJWT } from "../../../middlewares/auth";
import { verify } from "jsonwebtoken";

const router : Router = Router();
const Service = new usersService();

router.post("/login", login);

router.get('/', verifyJWT, async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const users : Users[] = await Service.getUsers(); 
        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
    
})

router.get('/privilege/:privilege', verifyJWT, async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const { privilege } = req.params;
        const users : Users[] = await Service.filterByPrivileges(Boolean(privilege)); 
        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
    
})

router.get('/id/:id', verifyJWT, async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const { id } = req.params;
        const user : Users = await Service.getUserById(Number(id)); 
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
    
})

router.get('/listened/:idUser:idMusic', verifyJWT, async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const { idUser, idMusic } = req.params;
        const answer : Boolean = await Service.haveUserListenedMusic(Number(idUser), Number(idUser)); 
        res.status(200).json(answer);

    } catch (error) {
        next(error);
    }
    
})

router.get('/email/:email', verifyJWT, async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const { email } = req.params;
        const user : Users = await Service.getUserByEmail(email); 
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
    
})

router.post("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user : Users = req.body;
        await Service.createUser(user);
        res.status(201).send();
    } catch (error) {
        next(error);
    }
});


router.put("/id/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user : Users = req.body;
        await Service.updateUserById(Number(id), user);
        res.status(202).send();
    } catch (error) {
        next(error);
    }
});

router.put("/email/:email", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.params;
        const user : Users = req.body;
        await Service.updateUserByEmail(email, user);
        res.status(202).send();
    } catch (error) {
        next(error);
    }
});


router.get('/listened/:idUser:idMusic', verifyJWT, async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const { idUser, idMusic } = req.params;
        await Service.userListenedMusic(Number(idUser), Number(idUser)); 
        res.status(202);

    } catch (error) {
        next(error);
    }
    
})

router.delete("/id/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await Service.removeUserById(Number(id));
        res.status(202).send();
    } catch (error) {
        next(error);
    }
});


router.delete("/email/:email", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.params;
        await Service.removeUserByEmail(email);
        res.status(202).send();
    } catch (error) {
        next(error);
    }
});

export default router;