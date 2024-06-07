import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prismaClient";
import { PermissionError } from "../../errors/errors/PermissionError";
import bcrypt from "bcrypt";
import statusCodes from "../../utils/constants/statusCode";
import { Users } from "@prisma/client";
import { sign, verify } from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { TokenError } from "../../errors/errors/TokenError";

function genereteJWT(user: Users, res: Response) {
    const body = {
        id: user.id,
        email: user.email,
        role: user.privileges,
        name: user.name
    }

    const token = sign({user: body}, process.env.SECRET_KEY || "", {expiresIn: process.env.JWT_EXPIRATION});
    res.cookie("jwt", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV !== "development",
        
    });
}

function cookieExtractor(req: Request) {
    let token = null;
    if(req.cookies){
        token = req.cookies["jwt"];
    }
    return token;
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
   try{
        const token = cookieExtractor(req);
        if(token){
            const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
            req.user = decoded.user;
        }
        if(req.user == null){
            throw new TokenError("Você precisa estar logado para realizar está ação!")
        }
        next();
   }catch(error){
       next(error);
   }
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

        genereteJWT(user, res);

        res.status(statusCodes.NO_CONTENT).json("Login efetuado com sucesso!")
    } catch (error) {
        next(error);
    }
}

export function logout(req: Request, res: Response) {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
    });
    res.status(statusCodes.NO_CONTENT).json("Logout efetuado com sucesso!");
}

export function notLoggedIn(req: Request, res: Response, next: NextFunction) {
    try {
        const token = cookieExtractor(req);
        if (token) {
            const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
            req.user = decoded.user;
        }
        if (req.user != null) {
            throw new TokenError("Você já está logado!");
        }
        next();
    } catch (error) {
        next(error);
    }
}

export function checkRole(req: Request, res: Response, next: NextFunction) {
    if(req.user.privileges == true){
        next();
    }else{
        throw new PermissionError("Você não tem permissão para realizar esta ação!");
    }
} 