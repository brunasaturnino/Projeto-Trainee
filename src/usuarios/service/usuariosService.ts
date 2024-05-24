import { Usuarios } from "@prisma/client";
import prisma from "../../config/prismaClient";
import { Usuario } from "../classes/usuario";

class usuariosService {

    async createUsuario(usuario : Usuario)
    {
        await prisma.usuarios.create({
            data: usuario
        });
    }

    async getUserById(id : number)
    {
        const user : Usuario = await prisma.usuarios.findFirst({
            where : {
                id: id
            }
        });

        return user;
    }

    async getUserByEmail(email : string)
    {
        const user : Usuario = await prisma.usuarios.findFirst({
            where : {
                email: email
            }
        });

        return user;
    }

    async filterByPrivilegios(privilegio : boolean)
    {
        const users = await prisma.usuarios.findMany({
            where: {
                privilegio: privilegio
            }
        });

        return users;
    }

    async updateUserById(id : number, usuario : Usuario)
    {
        await prisma.usuarios.update({
            data: usuario,
            where: {
                id: id
            }           
        })
    }

    async updateUserByEmail(email : string, usuario : Usuario)
    {
        await prisma.usuarios.update({
            data: usuario,
            where: {
                email: email
            }           
        })
    }

    async removeUserById(id : number)
    {
        await prisma.usuarios.delete({
            where: {
                id: id
            }           
        })
    }

    async removeUserByEmail(email : string)
    {
        await prisma.usuarios.delete({
            where: {
                email: email
            }           
        })
    }
}