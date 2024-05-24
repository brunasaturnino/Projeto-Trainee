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
    }

    async getUserByEmail(email : string)
    {
        const user : Usuario = await prisma.usuarios.findFirst({
            where : {
                email: email
            }
        });
    }

    async filterByPrivilegios(privilegio : boolean)
    {
        const users = await prisma.usuarios.findMany({
            where: {
                privilegio: privilegio
            }
        });
    }
}