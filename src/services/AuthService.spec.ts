import { describe, expect, test, beforeEach, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import { hash } from "bcryptjs";
import { DataSource } from 'typeorm';
import { TestHelper } from '../../tests/TestHelper';
import { User } from '../entities/User';
import { AuthService } from './AuthService';
import { instanceToPlain } from 'class-transformer';
import { userMock } from '../../tests/mocks/testMocks';
import { UserMapper } from '../mappers/UserMapper';

describe(`${AuthService.name}`, () => {
    let authService: AuthService;
    let database: DataSource;

    beforeAll(async () => {
        await TestHelper.instance.setupTestDB();
        database = TestHelper.instance.database;
        authService = new AuthService(database.getRepository(User));
    });

    afterAll(async () => {
        await TestHelper.instance.teardownTestDB();
    });

    test(`should be created`, async () => {
        expect(authService).toBeTruthy();
    });

    test(`${AuthService.prototype.login.name} should be success`, async () => {
        const password = await hash(userMock.password, 8);
        const newUser = authService.usersRepositories.create({ 
            name: userMock.name, 
            email: userMock.email, 
            admin: userMock.admin, 
            password 
        });
        const createdUser = UserMapper.toDTO(await authService.usersRepositories.save(newUser));
        const user = { email: userMock.email, password: userMock.password };
        const response = await authService.login(user);
        expect(response.profile).toMatchObject(createdUser as any);
        expect(response.token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/);
    });

    test(`${AuthService.prototype.login.name} should throw error when password is incorrect`, async () => {
        const user = { email: 'test@test.com', password: '478' };
        try {
            await authService.login(user);
        } catch (error: any) {
            expect(error.message).toEqual("Email/Password incorrect");
        }
    });

    test(`${AuthService.prototype.login.name} should throw error when user is not found`, async () => {
        const user = { email: 'anyuser@user.com', password: '' };
        // expect(async () => await authService.login(user)).toThrow("Email/Password incorrect");
        try {
            await authService.login(user);            
        } catch (error: any) {
            expect(error.message).toEqual("Email/Password incorrect");            
        }
    });
});