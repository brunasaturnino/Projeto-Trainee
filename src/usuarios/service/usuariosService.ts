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

}