import { Users, Musics } from "@prisma/client";
import prisma from "../../../../config/prismaClient";
import bcrypt from "bcrypt";
import { QueryError } from "../../../../errors/errors/QueryError";
import { isValidEmail, isValidPhoto, isValidPrivileges, isEmpty, isValidId } from "../../../../utils/auxiliary/auxiliaryFunctions"
import { InvalidParamError } from "../../../../errors/errors/InvalidParamError";
import { NotAuthorizedError } from "../../../../errors/errors/NotAuthorizedError";

class usersService {
    async encriptPassword(password : string){
        const saltRounds = 10;
        const encrypted = await bcrypt.hashSync(password, saltRounds);
        return encrypted;
    }

    async createUser(user : Users, currentUser : Users | null | undefined)
    {
    
        if (!isValidEmail(user.email) || isEmpty(user.name) ||
        isEmpty(user.password) || !isValidPhoto(user.photo) || !isValidPrivileges(user.privileges))
            throw new InvalidParamError('Invalid param');
    
        if (user.privileges && !(currentUser?.privileges))
            throw new Error('Only administrators can create new administrators');
    
        const userExist : Users | null = await prisma.users.findFirst({
            where : {
                email: user.email
            }
        })

        if (userExist) 
            throw new QueryError("This email is already registered");
        
        const encrypted = await this.encriptPassword(user.password);

        const newUser : Users | null = await prisma.users.create({
            data : {
                name: user.name,
                email: user.email,
                password : encrypted,
                privileges : Boolean(user.privileges),
                photo : user.photo

            },
        });
        
        if(!newUser)
            throw new Error("Something happened");

        return newUser;
        
    }

    async getUserById(id : number)
    {
        if(isNaN(id) || !isValidId(id))
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

    async getAllUsers()
    {
        const users: Users[] | null = await prisma.users.findMany({
            orderBy: { name: "asc" },
        });

        if (!users || users.length == 0)
            throw new QueryError("Database empty");

        return users;
    }

    async filterByPrivileges(privileges : boolean)
    {
        if(!isValidPrivileges(privileges))
            throw new InvalidParamError('Invalid param');

    
        const users : Users[] | null = await prisma.users.findMany({
            where: {
                privileges: privileges
            }
        });

        if (!users || users.length == 0)
            throw new QueryError("Database empty");

        return users;    
    }

    async updateUserById(id : number, user : Users, currentUser : Users)
    {
        
        if (!isValidEmail(user.email) || isEmpty(user.name) ||
        isEmpty(user.password) || !isValidPhoto(user.photo) || !isValidPrivileges(user.privileges) || isNaN(id) || !isValidId(id))
            throw new InvalidParamError('Invalid param');

        if (!currentUser.privileges && currentUser.id != id)
            throw new Error('Only administrators can update users freely');

        if (user.privileges && !(currentUser?.privileges))
            throw new NotAuthorizedError('Only administrators can update privileges');

        const userExist : Users | null = await prisma.users.findFirst({
            where : {
                id: id
            }
        })

        if (!userExist) 
            throw new QueryError("This user doesn't exist");

        const updatedUser : Users | null = await prisma.users.update({
            data : user,
            where: {
                id: id
            }           
        })

        if(!updatedUser)
            throw new Error("Something happened");

        return updatedUser;
    }

    async updateUserByEmail(email : string, user : Users, currentUser : Users)
    {

        if (!isValidEmail(user.email) || isEmpty(user.name) ||
        isEmpty(user.password) || !isValidPhoto(user.photo) || !isValidPrivileges(user.privileges) || !isValidEmail(email))
            throw new InvalidParamError('Invalid param');

        if (!currentUser.privileges && currentUser.email != email)
            throw new Error('Only administrators can update users freely');

        if (user.privileges && !(currentUser?.privileges))
            throw new NotAuthorizedError('Only administrators can update privileges');

        const userExist : Users | null = await prisma.users.findFirst({
            where : {
                email: email
            }
        })

        if (!userExist) 
            throw new QueryError("This user doesn't exist");


        const updatedUser : Users | null = await prisma.users.update({
            data: user,
            where: {
                email: email
            }           
        })

        if(!updatedUser)
            throw new Error("Something happened");

        return updatedUser;
        
    }

    async removeUserById(id : number, currentUser : Users)
    {
        
        if (isNaN(id) || !isValidId(id))
            throw new InvalidParamError('Invalid param');

        if (!currentUser.privileges && currentUser.id != id)
            throw new Error('Only administrators can remove users freely');

        const userExist : Users | null = await prisma.users.findFirst({
            where : {
                id: id
            }
        })

        if (!userExist) 
            throw new QueryError("This user doesn't exist");

        const removedUser : Users | null = await prisma.users.delete({
            where: {
                id: id
            }           
        })
    
        if(!removedUser)
            throw new Error("Something happened");

        return removedUser;
    }

    async removeUserByEmail(email : string, currentUser : Users)
    {

        if(!isValidEmail(email))
            throw new InvalidParamError('Invalid param');

        if (!currentUser.privileges && currentUser.email != email)
            throw new Error('Only administrators can remove users freely');

        const userExist : Users | null = await prisma.users.findFirst({
            where : {
                email: email
            }
        })

        if (!userExist) 
            throw new QueryError("This user doesn't exist");
        
        const removedUser : Users | null = await prisma.users.delete({
            where: {
                email: email
            }           
        })

        if(!removedUser)
            throw new Error("Something happened");

        return removedUser;


    }

    async haveUserListenedMusic(idUser : number, idMusic : number, currentUser : Users)
    {
        if(isNaN(idUser) || isNaN(idMusic) || !isValidId(idUser) || !isValidId(idMusic))
            throw new InvalidParamError('Invalid param');

        if (!currentUser.privileges && currentUser.id != idUser)
            throw new Error('Only administrators can see users history freely')

        const userExist : Users | null = await prisma.users.findFirst({
            where : {
                id: idUser
            }
        })

        if (!userExist) 
            throw new QueryError("This user doesn't exist");

        const musicExist : Musics | null = await prisma.musics.findFirst({
            where : {
                id: idMusic
            }
        })

        if (!musicExist) 
            throw new QueryError("This music doesn't exist");


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
    }

    async userListenedMusic(idUser : number, idMusic : number, currentUser : Users)
    {

        if(isNaN(idUser) || isNaN(idMusic) || !isValidId(idUser) || !isValidId(idMusic))
            throw new InvalidParamError('Invalid param');

        if (!currentUser.privileges && currentUser.id != idUser)
            throw new Error('Only administrators can add musics to users history freely')

        const userExist : Users | null = await prisma.users.findFirst({
            where : {
                id: idUser
            }
        })

        if (!userExist) 
            throw new QueryError("This user doesn't exist");

        const musicExist : Musics | null = await prisma.musics.findFirst({
            where : {
                id: idMusic
            }
        })

        if (!musicExist) 
            throw new QueryError("This music doesn't exist");
        
        const user : Users | null = await prisma.users.update({
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

        if(!user)
            throw new Error("Something happened");

        return user;
           
    }

    async removeUserListenedMusic(idUser: number, idMusic: number, currentUser : Users) {

        if(isNaN(idUser) || isNaN(idMusic) || !isValidId(idUser) || !isValidId(idMusic))
            throw new InvalidParamError('Invalid param');

        if (!currentUser.privileges && currentUser.id != idUser)
            throw new Error('Only administrators remove musics from users history freely');

        if(await this.haveUserListenedMusic(idUser, idMusic, currentUser) == false)
        {
            throw new QueryError("User haven't listened this music");
        }
    
        const user : Users | null = await prisma.users.update({
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

        if(!user)
            throw new Error("Something happened");

        return user;
        
    }

    async getAllMusicsListenedByUser(idUser : number, currentUser : Users) {

        if(isNaN(idUser) || !isValidId(idUser))
            throw new InvalidParamError('Invalid param');

        if (!currentUser.privileges && currentUser.id != idUser)
            throw new Error('Only administrators remove musics from users history freely');

        const userExist : Users | null = await prisma.users.findFirst({
            where : {
                id: idUser
            }
        })

        if (!userExist) 
            throw new QueryError("This user doesn't exist");
        
        const user = await prisma.users.findFirst({
            where: {
                id: idUser
            },

            include: {
                musics: true
            }
        })
        
        if (user == null)
            throw new Error("Something happened");

        if (!user.musics || user.musics.length == 0)
            throw new QueryError("User haven't listened any music yet");

        return user.musics;
    }
   

    async updateUserPasswordByEmail(email : string, password : string, currentUser : Users)
    {

        if(!isValidEmail(email) || isEmpty(password))
            throw new InvalidParamError('Invalid param');

        if (!currentUser.privileges && currentUser.email != email)
            throw new Error('Only administrators edit password freely');

        const userExist : Users | null = await prisma.users.findFirst({
            where : {
                email: email
            }
        })

        if (!userExist) 
            throw new QueryError("This user doesn't exist");

        const encrypted = await this.encriptPassword(password);

        const updatedUser : Users | null = await prisma.users.update({
            where: {
                email: email
            },

            data: {
                password: encrypted
            }
        })

        if(!updatedUser)
            throw new Error("Something happened");

        return updatedUser;
    }
}


export default usersService;