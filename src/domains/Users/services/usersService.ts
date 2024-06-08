import { Users } from "@prisma/client";
import prisma from "../../../../config/prismaClient";
import bcrypt from "bcrypt";
import { QueryError } from "../../../../errors/errors/QueryError";
import { isValidEmail, isValidPhoto, isEmpty } from "../../../../utils/auxiliary/auxiliaryFunctions"
import { InvalidParamError } from "../../../../errors/errors/InvalidParamError";

class usersService {
    async encriptPassword(password : string){
        const saltRounds = 10;
        const encrypted = await bcrypt.hashSync(password, saltRounds);
        return encrypted;
    }

    async createUser(user : Users, currentUser : Users | null)
    {
    
        if (!isValidEmail(user.email) || isEmpty(user.name) ||
        isEmpty(user.password) || isValidPhoto(user.photo))
            throw new InvalidParamError('Invalid param');
        
        if (user.privileges && !currentUser.privileges)
            throw new Error('Only administrators can create new administrators');
        
        const userExist : Users | null = await prisma.users.findFirst({
            where : {
                email: user.email
            }
        })

        if (userExist) 
            throw new QueryError("This email is already registered");
        
        const encrypted = await this.encriptPassword(user.password);

        await prisma.users.create({
            data : {
                name: user.name,
                email: user.email,
                password : encrypted,
                privileges : Boolean(user.privileges),
                photo : user.photo

            },
        });    
        
    }

    async getUserById(id : number)
    {
        if(isNaN(id))
            throw new InvalidParamError('Invalid param');
            
        const user : Users | null = await prisma.users.findFirst({
            where : {
                id: id
            }
        }); 
        
        if (!user)
            throw new QueryError("This account doesn't exist");
            
        return user;
    }

    async getUserByEmail(email : string)
    {
        if(!isValidEmail(email))
            throw new InvalidParamError('Invalid param');

        const user : Users | null = await prisma.users.findFirst({
            where : {
                email: email
            }
        });

        if (!user)
            throw new QueryError("This account doesn't exist");

        return user;
    }

    async getUsers()
    {
        const users: Users[] | null = await prisma.users.findMany({
            orderBy: { name: "asc" },
        });

        if (!users)
            throw new QueryError("Database empty");

        return users;
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

    async removeUserListenedMusic(idUser: number, idMusic: number) {
        try {
            await prisma.users.update({
                where: {
                    id: idUser
                },
                data: {
                    musics: {
                        disconnect: {
                            id: idMusic,
                        },
                    },
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getAllMusicasListenedByUser(idUser : number){
        try {
            const user = await prisma.users.findFirst({
                where: {
                    id: idUser
                },
    
                include: {
                    musics: true
                }
            })
            
            return user.musics;
        } catch (error) {
            throw error;
        }
    }
   

    async updateUserPasswordByEmail(email : string, password : string)
    {
        try {
            const encrypted = await this.encriptPassword(password);
            await prisma.users.update({
                where: {
                    email: email
                },
    
                data: {
                    password: encrypted
                }
            })
            
        } catch (error) {
            throw error;
        }
        
    }
}


export default usersService;