import { describe, expect, test, beforeEach, afterEach, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import { hash } from "bcryptjs";
import { DataSource } from 'typeorm';
import { TestHelper } from '../../tests/TestHelper';
import { User } from '../entities/User';
import { instanceToPlain } from 'class-transformer';
import { UserService } from './UserService';
import userFactory from '../db/factories/user.factory';
import UserSeeder, { usersCount } from '../db/seeds/user.seeder';
import { userMock } from '../../tests/mocks/testMocks';
import { UserMapper } from '../mappers/UserMapper';
import { UserCreateDTO } from '../dtos/UserDTO';

describe(`${UserService.name}`, () => {
    let userService: UserService;
    let database: DataSource;

    beforeAll(async () => {
        await TestHelper.instance.setupTestDB();
        await TestHelper.instance.setupSeeders([userFactory], [UserSeeder]);
        database = TestHelper.instance.database;
        userService = new UserService(database.getRepository(User));
    });

    afterAll(async () => {
        await TestHelper.instance.teardownTestDB();
    });

    test(`should be created`, async () => {
        expect(userService).toBeTruthy();
    });

    test(`${UserService.prototype.getAll.name} should return User List`, async () => {
        const response = await userService.getAll();
        expect(response.total).toBe(usersCount);
        expect(response.data.length).toBe(usersCount);
    });

    test(`${UserService.prototype.getById.name} should return an User by Id`, async () => {
        const user = UserMapper.toDTO(await userService.usersRepositories.findOneBy({ email: userMock.email }) as any);
        const response = await userService.getById(user?.id || '');
        expect(response).toMatchObject(user as any);
    });

    test(`${UserService.prototype.getById.name} should throw error when User is not found`, async () => {
        try {
            await userService.getById('');
        } catch (error: any) {
            expect(error.message).toMatch('User not found');
        }
    });

    test(`${UserService.prototype.create.name} should create new User successfully`, async () => {
        const newUser: UserCreateDTO = {
            name: 'newUser',
            email: 'newUser',
            admin: true,
            password: '123456'
        }
        const response = await userService.create(newUser);
        expect(response.email).toEqual(newUser.email);
    });

    test(`${UserService.prototype.create.name} should throw error when User email does not exist`, async () => {
        try {
            await userService.create({ email: null } as any);
        } catch (error: any) {
            expect(error.message).toEqual('Email incorrect');
        }
    });

    test(`${UserService.prototype.create.name} should throw error when User already exists`, async () => {
        const user = UserMapper.toDTO(await userService.usersRepositories.findOneBy({ email: userMock.email }) as any);
        try {
            await userService.create(user as any);
        } catch (error: any) {
            expect(error.message).toEqual('User already exists');
        }
    });

    test(`${UserService.prototype.update.name} should update an User successfully`, async () => {
        const userTest = UserMapper.toDTO(await userService.usersRepositories.findOneBy({ email: userMock.email }) as any);
        userTest.name = 'updatedUser';
        const response = await userService.update({ ...userTest, password: '123456', products: [] } as any);
        expect(response).toMatchObject(userTest as any);
    });

    test(`${UserService.prototype.update.name} should throw error when User is not found`, async () => {
        try {
            await userService.update({ id: '', email: '', name: '', password: '' });
        } catch (error: any) {
            expect(error.message).toEqual('User not found');
        }
    });

    test(`${UserService.prototype.delete.name} should delete an User successfully`, async () => {
        const userTest = UserMapper.toDTO(await userService.usersRepositories.findOneBy({ email: userMock.email }) as any);
        const response = await userService.delete(userTest.id);
        expect(response).toBe(true);
    });

    test(`${UserService.prototype.delete.name} should throw error when User is not found`, async () => {
        try {
            await userService.delete('');
        } catch (error: any) {
            expect(error.message).toEqual('User not found');
        }
    });    
});