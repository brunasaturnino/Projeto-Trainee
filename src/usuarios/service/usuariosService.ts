import { Usuarios } from "@prisma/client";
import prisma from "../../config/prismaClient";
import { Usuario } from "../classes/usuario";

class usuariosService {

    async createUsuario(usuario : Usuario)
    {
        try {
            await prisma.usuarios.create({
                data: usuario
            });    

        } catch (error) {
            throw error;
        }
        
    }

    async getUserById(id : number)
    {
        try {
            const user : Usuario = await prisma.usuarios.findFirst({
                where : {
                    id: id
                }
            });    

            return user;

        } catch (error) {
            throw error;
        }
        
    }

    async getUserByEmail(email : string)
    {
        try {
            const user : Usuario = await prisma.usuarios.findFirst({
                where : {
                    email: email
                }
            });
    
            return user;

        } catch (error) {
            throw error;
        }
        
    }

    async filterByPrivilegios(privilegio : boolean)
    {

        try {
            const users = await prisma.usuarios.findMany({
                where: {
                    privilegio: privilegio
                }
            });
    
            return users;

        } catch (error) {
            throw error;
        }
        
    }

    async updateUserById(id : number, usuario : Usuario)
    {
        try {
            await prisma.usuarios.update({
                data: usuario,
                where: {
                    id: id
                }           
            })
        } catch (error) {
            throw error;
        }
        
    }

    async updateUserByEmail(email : string, usuario : Usuario)
    {
        try {
            await prisma.usuarios.update({
                data: usuario,
                where: {
                    email: email
                }           
            })
        } catch (error) {
            throw error;
        }
        
    }

    async removeUserById(id : number)
    {
        try {
            await prisma.usuarios.delete({
                where: {
                    id: id
                }           
            })
        } catch (error) {
            throw error;
        }
        
    }

    async removeUserByEmail(email : string)
    {
        try {
            await prisma.usuarios.delete({
                where: {
                    email: email
                }           
            })
        } catch (error) {
            throw error;
        }

    }
}