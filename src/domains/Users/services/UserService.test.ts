import { Users } from "@prisma/client";
import usersService from './usersService';
import { prismaMock } from '../../../../config/singleton';
import { QueryError } from "../../../../errors/errors/QueryError";
import { InvalidParamError } from "../../../../errors/errors/InvalidParamError";

const UserService = new usersService();

describe('createUser', () => {

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

    test("trying to create an admin not having privileges ==> throw error", async () => {
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