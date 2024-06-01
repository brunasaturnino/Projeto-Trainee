import { Router, Request, Response, NextFunction } from "express";;
import usersService from "../services/usersService";
import { ObjectEnumValue } from "@prisma/client/runtime/library";
import { Users } from "@prisma/client";

const router = Router();
const Service = new usersService();

router.get('/', async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const users : Users[] = await Service.getUsers(); 
        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
    
})

router.get('/:id', async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const { id } = req.params;
        const user : Users = await Service.getUserById(Number(id)); 
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
    
})

router.get('/:email', async (req : Request, res : Response, next : NextFunction) => {
    
    try {
        const { email } = req.params;
        const user : Users = await Service.getUserByEmail(email); 
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
    
})


