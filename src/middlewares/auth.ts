import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prismaClient";
import { PermissionError } from "../../errors/errors/PermissionError";
import bcrypt from "bcrypt";
import statusCodes from "../../utils/constants/statusCode";
import { Users } from "@prisma/client";
import { sign } from "jsonwebtoken";

function genereteJWT(user: Users) {
    const body = {
        id: user.id,
        email: user.email,
        role: user.privileges,
        name: user.name
    }

    const token = sign({user: body}, process.env.SECRET_KEY || "", {expiresIn: process.env.JWT_EXPIRATION});
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try{
        const user = await prisma.users.findUnique({
            where: {
                email: req.body.email
            }
        });

        if(!user){
            throw new PermissionError("Email e/ou senha incorretos");
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if(!match){
            throw new PermissionError("Email e/ou senha incorretos");
        }

        genereteJWT();

        res.status(statusCodes.NO_CONTENT).json("Login efetuado com sucesso!")
    } catch (error) {
        next(error);
    }
}