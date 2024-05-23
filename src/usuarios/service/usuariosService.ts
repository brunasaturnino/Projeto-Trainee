import { Usuarios } from "@prisma/client";
import prisma from "../../config/prismaClient";
import { Usuario } from "../classes/usuario";

class usuariosService {

    async createUsuario(usuario : Usuario)
    {
        await prisma.usuarios.create({
            data: {
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha,
                foto: usuario.foto,
                privilegio : usuario.privilegio
            }
        });
    }
}