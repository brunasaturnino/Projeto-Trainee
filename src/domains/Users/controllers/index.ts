import { Router, Request, Response, NextFunction } from "express";;
import usersService from "../services/usersService";
import { ObjectEnumValue } from "@prisma/client/runtime/library";
import { Users } from "@prisma/client";
import { checkRole, login, logout,  notLoggedIn, verifyJWT } from "../../../middlewares/auth";
import { stringtoBoolean } from "../../../../utils/auxiliary/auxiliaryFunctions"
import { verify } from "jsonwebtoken";


const router : Router = Router();
const Service = new usersService();

router.post("/users/login", notLoggedIn, login);

router.post("/users/logout", verifyJWT, logout);

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentUser = req.user;
        const user : Partial<Users> = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            photo: req.body.photo,
            privileges: stringtoBoolean(req.body.privileges)
        }

        await Service.createUser(user as Users, currentUser);
        res.status(201).send();
    } catch (error) {
        next(error);
    }
});

router.get("/account", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user : Users = await Service.getUserByEmail(req.user.email);
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
});

router.put("/account/update", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
   try{
        const currentUser = req.user;
        const user : Users = req.body;
        await Service.updateUserByEmail(currentUser.email, user, currentUser);
        res.status(202).send("Usuário atualizado com sucesso!");
   }catch(error){
        next(error);
   } 
});

router.put("/account/password", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { password } = req.body;
        await Service.updateUserPasswordByEmail(req.user.email, password);
        res.status(202).send("Senha atualizada com sucesso!");
    }catch(error){
        next(error);
    }
});

router.delete("/account/delete", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try{
        await Service.removeUserByEmail(req.user.email);
        res.status(202).send("Usuário deletado com sucesso!");
    }catch(error){
        next(error);
    }
});

router.post("/account/listen/:id", verifyJWT, async (req : Request, res : Response, next : NextFunction) => {
    try{
        const { id } = req.params;
        await Service.userListenedMusic(req.user.id, Number(id));
        res.status(202).send("Música ouvida com sucesso!");
    }catch(error){
        next(error);
    }
    
});

router.delete("/account/unlisten/:id", verifyJWT, async (req : Request, res : Response, next : NextFunction) => {
    try{
        const { id } = req.params;
        await Service.removeUserListenedMusic(req.user.id, Number(id));
        res.status(202).send("Música desmarcada com sucesso!");
    }catch(error){
        next(error);
    }
    
});

router.get("/account/musics", verifyJWT, async (req : Request, res : Response, next : NextFunction) => {
    try{
        const musics = await Service.getAllMusicsListenedByUser(req.user.id);
        res.status(200).json(musics);
    }catch(error){
        next(error);
    }
});
    
router.get('/', verifyJWT, checkRole, async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const users : Users[] = await Service.getAllUsers(); 
        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
    
})

router.post("/admin/create", verifyJWT, checkRole, async (req : Request, res : Response, next : NextFunction) => {
    try{
        const user : Users = req.body;
        await Service.createUser(user, req.user);
        res.status(201).send();
    }catch(error){
        next(error);
    }
});

router.get('/privilege/:privilege', verifyJWT, async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const { privilege } = req.params;
        const users : Users[] = await Service.filterByPrivileges(Boolean(privilege)); 
        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
    
})

router.get('/id/:id', verifyJWT, checkRole, async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const { id } = req.params;
        const user : Users = await Service.getUserById(Number(id)); 
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
    
})

router.get('/listened/:idUser:idMusic', verifyJWT, checkRole, async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const { idUser, idMusic } = req.params;
        const answer : Boolean = await Service.haveUserListenedMusic(Number(idUser), Number(idUser)); 
        res.status(200).json(answer);

    } catch (error) {
        next(error);
    }
    
})

router.get('/email/:email', verifyJWT, checkRole, async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const { email } = req.params;
        const user : Users = await Service.getUserByEmail(email); 
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
    
})


router.put("/update/id/:id", verifyJWT, checkRole, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const currentUser = req.user;
        const user : Users = req.body;
        await Service.updateUserById(Number(id), user, currentUser);
        res.status(202).send();
    } catch (error) {
        next(error);
    }
});

router.put("/update/email/:email", verifyJWT, checkRole, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.params;
        const currentUser = req.user;
        const user : Users = req.body;
        await Service.updateUserByEmail(email, user, currentUser);
        res.status(202).send();
    } catch (error) {
        next(error);
    }
});




router.delete("/delete/id/:id", verifyJWT, checkRole, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await Service.removeUserById(Number(id));
        res.status(202).send();
    } catch (error) {
        next(error);
    }
});


router.delete("/delete/email/:email", verifyJWT, checkRole, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.params;
        await Service.removeUserByEmail(email);
        res.status(202).send();
    } catch (error) {
        next(error);
    }
});

export default router;