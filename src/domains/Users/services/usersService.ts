import { Users } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class usersService {

    async createUser(user : Users)
    {
        try {
            await prisma.users.create({
                data : {
                    name: user.name,
                    email: user.email,
                    password : user.password,
                    privileges : Boolean(user.privileges),
                    photo : user.photo

                },
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
                orderBy: { name: "asc" },
            });
    
            return users;

        } catch (error) {
            throw error;
        }
        
    }

    async filterByPrivileges(privileges : boolean)
    {

        try {
            const users : Users[] | null = await prisma.users.findMany({
                where: {
                    privileges: privileges
                }
            });
    
            return users;

        } catch (error) {
            throw error;
        }
        
    }

    async updateUserById(id : number, user : Users)
    {
        try {
            await prisma.users.update({
                data : {
                    name: user.name,
                    email: user.email,
                    password : user.password,
                    privileges : Boolean(user.privileges),
                    photo : user.photo

                },
                
                where: {
                    id: id
                }           
            })
        } catch (error) {
            throw error;
        }
        
    }

    async updateUserByEmail(email : string, user : Users)
    {
        try {
            await prisma.users.update({
                data: user,
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

    async haveUserListenedMusic(idUser : number, idMusic : number)
    {
        try {
            const user : Users | null = await prisma.users.findFirst({
                where: {
                    id: idUser
                },
    
                include: {
                    musics: {
                        where: {
                            id: idMusic
                        }
    
                    }
                }
            })
            
            return (user != null);
        } catch (error) {
            throw error;
        }
        
    }

    async userListenedMusic(idUser : number, idMusic : number)
    {
        try {
            await prisma.users.update({
                where: {
                    id: idUser
                },
    
                data: {
                    musics: {
                        connect: {
                            id: idMusic,
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