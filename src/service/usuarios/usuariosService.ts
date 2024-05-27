import { Usuarios } from "@prisma/client";
import prisma from "../../config/prismaClient";

class usuariosService {

    async createUsuario(usuario : Usuarios)
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
            const user : Usuarios | null = await prisma.usuarios.findFirst({
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
            const user : Usuarios | null = await prisma.usuarios.findFirst({
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
            const users : Usuarios[] | null = await prisma.usuarios.findMany({
                where: {
                    privilegio: privilegio
                }
            });
    
            return users;

        } catch (error) {
            throw error;
        }
        
    }

    async updateUserById(id : number, usuario : Usuarios)
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

    async updateUserByEmail(email : string, usuario : Usuarios)
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

    async haveUserListenedMusica(idUsuario : number, idMusica : number)
    {
        try {
            const usuario : Usuarios | null = await prisma.usuarios.findFirst({
                where: {
                    id: idUsuario
                },
    
                include: {
                    musicas: {
                        where: {
                            id: idMusica
                        }
    
                    }
                }
            })
            
            return (usuario != null);
        } catch (error) {
            throw error;
        }
        
    }

    async userListenedMusica(idUsuario : number, idMusica : number)
    {
        try {
            await prisma.usuarios.update({
                where: {
                    id: idUsuario
                },
    
                data: {
                    musicas: {
                        connect: {
                            id: idMusica,
                        },
                    },
                }
            })
            
        } catch (error) {
            throw error;
        }
        
    }
}

export default usuariosService;