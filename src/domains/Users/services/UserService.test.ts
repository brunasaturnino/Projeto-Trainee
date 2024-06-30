import { Users } from "@prisma/client";
import usersService from './usersService';
import { prismaMock } from '../../../../config/singleton';
import { QueryError } from "../../../../errors/errors/QueryError";
import { InvalidParamError } from "../../../../errors/errors/InvalidParamError";
import { NotAuthorizedError } from "../../../../errors/errors/NotAuthorizedError";
import { isValidEmail } from "../../../../utils/auxiliary/auxiliaryFunctions";

const UserService = new usersService();

describe('createUser', () => {

    test("invalid param ==> throw error", async () => {

        const user: Users = {
            id: 1,
            name: "test",
            email: "invalid",
            password: "",
            photo: "teste.jpg",
            privileges: false
        };

        const currentUser: Partial<Users> = {
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        await expect(UserService.createUser(user, currentUser as Users)).rejects.toThrow(
            new InvalidParamError('Invalid param')
        );

        expect(prismaMock.users.findFirst).not.toHaveBeenCalled();
        
    });

    test("user already exists ==> throw error", async () => {

        const existuser: Users = {
            id: 1,
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        prismaMock.users.findFirst.mockResolvedValue(existuser);

        const user: Partial<Users> = {
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        await expect(UserService.createUser(user as Users, null)).rejects.toThrow(
            new QueryError("This email is already registered")
        );

        expect(prismaMock.users.findFirst).toHaveBeenCalledWith({ where: { email: user.email } });
        expect(prismaMock.users.create).not.toHaveBeenCalled();
    });

    test("to create an admin not having privileges ==> throw error", async () => {
        const currentUser: Partial<Users> = {
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        prismaMock.users.findFirst.mockResolvedValue(null);

        const user: Partial<Users> = {
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        await expect(UserService.createUser(user as Users, currentUser as Users)).rejects.toThrow(
            new Error('Only administrators can create new administrators')
        );

        expect(prismaMock.users.findFirst).not.toHaveBeenCalledWith({ where: { email: user.email } });
        expect(prismaMock.users.create).not.toHaveBeenCalled();
    });


    test("create an admin having privileges ==> user", async () => {
        const currentUser: Partial<Users> = {
            name: "admin",
            email: "admin@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        prismaMock.users.findFirst.mockResolvedValue(null);

        const user: Partial<Users> = {
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        prismaMock.users.create.mockResolvedValue(user as Users);

        await expect(UserService.createUser(user as Users, currentUser as Users)).resolves.toEqual(user as Users);

        expect(prismaMock.users.findFirst).toHaveBeenCalledWith({ where: { email: user.email } });
        expect(prismaMock.users.create).toHaveBeenCalled();
    });

    test("create an user ==> user", async () => {
        

        prismaMock.users.findFirst.mockResolvedValue(null);

        const user: Partial<Users> = {
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        prismaMock.users.create.mockResolvedValue(user as Users);

        await expect(UserService.createUser(user as Users, null)).resolves.toEqual(user as Users);

        expect(prismaMock.users.findFirst).toHaveBeenCalledWith({ where: { email: user.email } });
        expect(prismaMock.users.create).toHaveBeenCalled();
    });

    
});


describe('getUserById', () => {

    test("invalid id ==> throw error", async () => {

        await expect(UserService.getUserById(-1)).rejects.toThrow(
            new InvalidParamError('Invalid param')
        );

        expect(prismaMock.users.findFirst).not.toHaveBeenCalled();
        
    });

    test("search a user ==> user", async () => {
        
        const existUser: Users = {
            id: 1,
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        prismaMock.users.findFirst.mockResolvedValue(existUser);

        await expect(UserService.getUserById(1)).resolves.toEqual(existUser);
        
        expect(prismaMock.users.findFirst).toHaveBeenCalledWith({ where: { id: 1 } });

    });

    
});


describe('getUserByEmail', () => {

    test("invalid email ==> throw error", async () => {

        await expect(UserService.getUserByEmail("invalid email")).rejects.toThrow(
            new InvalidParamError('Invalid param')
        );

        expect(prismaMock.users.findFirst).not.toHaveBeenCalled();
        
    });

    test("search a user ==> user", async () => {
        
        const existUser: Users = {
            id: 1,
            name: "test",
            email: "test2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        prismaMock.users.findFirst.mockResolvedValue(existUser);

        await expect(UserService.getUserByEmail("test2@ijunior.com")).resolves.toEqual(existUser);
        
        expect(prismaMock.users.findFirst).toHaveBeenCalledWith({ where: { email: "test2@ijunior.com" } });

    });

    
});


describe('getAllUsers', () => {

    test("database empty ==> throw error", async () => {

        prismaMock.users.findMany.mockResolvedValue([]);

        await expect(UserService.getAllUsers()).rejects.toThrow(
            new QueryError("Database empty")
        );

        expect(prismaMock.users.findMany).toHaveBeenCalled();
        
    });

    test("getting all users ==> users", async () => {

        const users : Users[] = [

            {
                id: 1,
                name: "test",
                email: "test2@ijunior.com",
                password: "teste123",
                photo: "teste.jpg",
                privileges: false
            },

            {
                id: 2,
                name: "adm",
                email: "adm@ijunior.com",
                password: "teste123",
                photo: "teste.jpg",
                privileges: true
            }
        ]

        prismaMock.users.findMany.mockResolvedValue(users);

        await expect(UserService.getAllUsers()).resolves.toEqual(users);

        expect(prismaMock.users.findMany).toHaveBeenCalled();
        
    });

    
});


describe('getAllUsers', () => {

    test("database empty ==> throw error", async () => {

        prismaMock.users.findMany.mockResolvedValue([]);

        await expect(UserService.filterByPrivileges(true)).rejects.toThrow(
            new QueryError("Database empty")
        );

        expect(prismaMock.users.findMany).toHaveBeenCalled();
        
    });

    test("getting all users with specified privilege ==> users", async () => {

        const users : Users[] = [

            {
                id: 1,
                name: "test",
                email: "test2@ijunior.com",
                password: "teste123",
                photo: "teste.jpg",
                privileges: true
            },

            {
                id: 2,
                name: "adm",
                email: "adm@ijunior.com",
                password: "teste123",
                photo: "teste.jpg",
                privileges: true
            }
        ]

        prismaMock.users.findMany.mockResolvedValue(users);

        await expect(UserService.filterByPrivileges(true)).resolves.toEqual(users);

        expect(prismaMock.users.findMany).toHaveBeenCalled(); 
    });    
});


describe('updateUserById', () => {

    test("invalid param ==> throw error", async () => {

        const user: Users = {
            id: 1,
            name: "test",
            email: "invalid",
            password: "",
            photo: "teste.jpg",
            privileges: false
        };

        const currentUser: Partial<Users> = {
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        await expect(UserService.updateUserById(user.id, user, currentUser as Users)).rejects.toThrow(
            new InvalidParamError('Invalid param')
        );

        expect(prismaMock.users.findFirst).not.toHaveBeenCalled();
        expect(prismaMock.users.update).not.toHaveBeenCalled();
        
    });

    test("update another user not being adm or not being yours ==> throw error", async () => {

        const user: Users = {
            id: 1,
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        const currentUser: Partial<Users> = {
            id: 2,
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };


        await expect(UserService.updateUserById(user.id, user, currentUser as Users)).rejects.toThrow(
            new Error('Only administrators can update users freely')
        );

        expect(prismaMock.users.findFirst).not.toHaveBeenCalled();
        expect(prismaMock.users.update).not.toHaveBeenCalled();
    
    })

    test("to update privileges not being adm ==> throw error", async () => {

        const user: Users = {
            id: 1,
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        const currentUser: Partial<Users> = {
            id: 1,
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        await expect(UserService.updateUserById(user.id, user, currentUser as Users)).rejects.toThrow(
            new NotAuthorizedError('Only administrators can update privileges')
        );

        expect(prismaMock.users.findFirst).not.toHaveBeenCalled();
        expect(prismaMock.users.update).not.toHaveBeenCalled();
        
    });

    test("user already exists ==> throw error", async () => {

        const user: Users = {
            id: 1,
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        const currentUser: Partial<Users> = {
            id: 1,
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        prismaMock.users.findFirst.mockResolvedValue(null);

        await expect(UserService.updateUserById(user.id, user, currentUser as Users)).rejects.toThrow(
            new QueryError("This user doesn't exist")
        );

        expect(prismaMock.users.findFirst).toHaveBeenCalledWith({ where: { id: user.id } });
        expect(prismaMock.users.update).not.toHaveBeenCalled();
        
    });


    test("user update ==> user", async () => {

        const user: Users = {
            id: 1,
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        const currentUser: Partial<Users> = {
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        prismaMock.users.findFirst.mockResolvedValue(user);

        prismaMock.users.update.mockResolvedValue(user)

        await expect(UserService.updateUserById(user.id, user, currentUser as Users)).resolves.toEqual(user);

        expect(prismaMock.users.findFirst).toHaveBeenCalledWith({ where: { id: user.id } });
        expect(prismaMock.users.update).toHaveBeenCalledWith({data : user,
            where: {
                id: user.id
            }}); 
    });    
});

describe('updateUserByEmail', () => {

    test("invalid param ==> throw error", async () => {

        const user: Users = {
            id: 1,
            name: "test",
            email: "invalid",
            password: "",
            photo: "teste.jpg",
            privileges: false
        };

        const currentUser: Partial<Users> = {
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        await expect(UserService.updateUserByEmail("test@gmail.com", user, currentUser as Users)).rejects.toThrow(
            new InvalidParamError('Invalid param')
        );

        expect(prismaMock.users.findFirst).not.toHaveBeenCalled();
        expect(prismaMock.users.update).not.toHaveBeenCalled();
        
    });

    test("update another user not being adm or not being yours ==> throw error", async () => {

        const user: Users = {
            id: 1,
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        const currentUser: Partial<Users> = {
            id: 2,
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };


        await expect(UserService.updateUserByEmail(user.email, user, currentUser as Users)).rejects.toThrow(
            new Error('Only administrators can update users freely')
        );

        expect(prismaMock.users.findFirst).not.toHaveBeenCalled();
        expect(prismaMock.users.update).not.toHaveBeenCalled();
        
    });


    test("to update privileges not being adm ==> throw error", async () => {

        const user: Users = {
            id: 1,
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        const currentUser: Partial<Users> = {
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        await expect(UserService.updateUserByEmail(user.email, user, currentUser as Users)).rejects.toThrow(
            new NotAuthorizedError('Only administrators can update privileges')
        );

        expect(prismaMock.users.findFirst).not.toHaveBeenCalled();
        expect(prismaMock.users.update).not.toHaveBeenCalled();
        
    });

    test("user already exists ==> throw error", async () => {

        const user: Users = {
            id: 1,
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        const currentUser: Partial<Users> = {
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        prismaMock.users.findFirst.mockResolvedValue(null);

        await expect(UserService.updateUserByEmail(user.email, user, currentUser as Users)).rejects.toThrow(
            new QueryError("This user doesn't exist")
        );

        expect(prismaMock.users.findFirst).toHaveBeenCalledWith({ where: { email: user.email } });
        expect(prismaMock.users.update).not.toHaveBeenCalled();
        
    });


    test("user update ==> user", async () => {

        const user: Users = {
            id: 1,
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        const currentUser: Partial<Users> = {
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        prismaMock.users.findFirst.mockResolvedValue(user);

        prismaMock.users.update.mockResolvedValue(user)

        await expect(UserService.updateUserByEmail(user.email, user, currentUser as Users)).resolves.toEqual(user);

        expect(prismaMock.users.findFirst).toHaveBeenCalledWith({ where: { email: user.email } });
        expect(prismaMock.users.update).toHaveBeenCalledWith({data : user,
            where: {
                email: user.email
            }});     
    });
});


describe('removeUserById', () => {

    test("invalid param ==> throw error", async () => {

        const currentUser: Partial<Users> = {
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        await expect(UserService.removeUserById(-1, currentUser as Users)).rejects.toThrow(
            new InvalidParamError('Invalid param')
        );

        expect(prismaMock.users.findFirst).not.toHaveBeenCalled();
        expect(prismaMock.users.delete).not.toHaveBeenCalled();
        
    });


    test("remove another user not being adm or not being yours ==> throw error", async () => {

        const currentUser: Partial<Users> = {
            id: 2,
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        await expect(UserService.removeUserById(1, currentUser as Users)).rejects.toThrow(
            new Error('Only administrators can remove users freely')
        );

        expect(prismaMock.users.findFirst).not.toHaveBeenCalled();
        expect(prismaMock.users.delete).not.toHaveBeenCalled();
        
    });

    test("user doesn't exists ==> throw error", async () => {

        const currentUser: Partial<Users> = {
            id: 1,
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        prismaMock.users.findFirst.mockResolvedValue(null);

        await expect(UserService.removeUserById(1, currentUser as Users)).rejects.toThrow(
            new QueryError("This user doesn't exist")
        );

        expect(prismaMock.users.findFirst).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(prismaMock.users.delete).not.toHaveBeenCalled();
        
    });


    test("user remove ==> user", async () => {

        const user: Users = {
            id: 1,
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        const currentUser: Partial<Users> = {
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        prismaMock.users.findFirst.mockResolvedValue(user);

        prismaMock.users.delete.mockResolvedValue(user)

        await expect(UserService.removeUserById(1, currentUser as Users)).resolves.toEqual(user);

        expect(prismaMock.users.findFirst).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(prismaMock.users.delete).toHaveBeenCalledWith({ where: { id: 1 }}); 
    });    
});


describe('removeUserByEmail', () => {

    test("invalid param ==> throw error", async () => {

        const currentUser: Partial<Users> = {
            name: "test",
            email: "testa2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        await expect(UserService.removeUserByEmail("invalid_email", currentUser as Users)).rejects.toThrow(
            new InvalidParamError('Invalid param')
        );

        expect(prismaMock.users.findFirst).not.toHaveBeenCalled();
        expect(prismaMock.users.delete).not.toHaveBeenCalled();
        
    });


    test("remove another user not being adm or not being yours ==> throw error", async () => {

        const currentUser: Partial<Users> = {
            id: 2,
            name: "test",
            email: "test2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        await expect(UserService.removeUserByEmail("test@ijunior.com", currentUser as Users)).rejects.toThrow(
            new Error('Only administrators can remove users freely')
        );

        expect(prismaMock.users.findFirst).not.toHaveBeenCalled();
        expect(prismaMock.users.delete).not.toHaveBeenCalled();
        
    });

    test("user doesn't exists ==> throw error", async () => {

        const currentUser: Partial<Users> = {
            id: 1,
            name: "test",
            email: "test2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        prismaMock.users.findFirst.mockResolvedValue(null);

        await expect(UserService.removeUserByEmail("test@ijunior.com", currentUser as Users)).rejects.toThrow(
            new QueryError("This user doesn't exist")
        );

        expect(prismaMock.users.findFirst).toHaveBeenCalledWith({ where: { email: "test@ijunior.com" } });
        expect(prismaMock.users.delete).not.toHaveBeenCalled();
        
    });


    test("user remove ==> user", async () => {

        const user: Users = {
            id: 1,
            name: "test",
            email: "test@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: false
        };

        const currentUser: Partial<Users> = {
            name: "test",
            email: "test2@ijunior.com",
            password: "teste123",
            photo: "teste.jpg",
            privileges: true
        };

        prismaMock.users.findFirst.mockResolvedValue(user);

        prismaMock.users.delete.mockResolvedValue(user)

        await expect(UserService.removeUserByEmail("test@ijunior.com", currentUser as Users)).resolves.toEqual(user);

        expect(prismaMock.users.findFirst).toHaveBeenCalledWith({ where: { email: "test@ijunior.com"} });
        expect(prismaMock.users.delete).toHaveBeenCalledWith({ where: { email: "test@ijunior.com" }}); 
    });    
});