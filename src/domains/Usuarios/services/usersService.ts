import { Users } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class usersService {

    async createUsuario(usuario : Users)
    {
        try {
            await prisma.users.create({
                data: usuario
            });    

        } catch (error) {
            throw error;
        }
        
    }

    async getUserById(id : number)
    {
        try {
            const user : Users | null = await prisma.users.findFirst({
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
            const user : Users | null = await prisma.users.findFirst({
                where : {
                    email: email
                }
            });
    
            return user;

        } catch (error) {
            throw error;
        }
        
    }

    async getUsers()
    {
        try {
            const users: Users[] | null = await prisma.users.findMany({
                orderBy: { nome: "asc" },
            });
    
            return users;

        } catch (error) {
            throw error;
        }
        
    }

    async filterByPrivilegios(privilegio : boolean)
    {

        try {
            const users : Users[] | null = await prisma.users.findMany({
                where: {
                    privilegio: privilegio
                }
            });
    
            return users;

        } catch (error) {
            throw error;
        }
        
    }

    async updateUserById(id : number, usuario : Users)
    {
        try {
            await prisma.users.update({
                data: usuario,
                where: {
                    id: id
                }           
            })
        } catch (error) {
            throw error;
        }
        
    }

    async updateUserByEmail(email : string, usuario : Users)
    {
        try {
            await prisma.users.update({
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
            await prisma.users.delete({
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
            await prisma.users.delete({
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
            const usuario : Users | null = await prisma.users.findFirst({
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
            await prisma.users.update({
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

export default usersService;