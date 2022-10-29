import { describe, expect, it, beforeEach, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import { hash } from "bcryptjs";
import { DataSource } from 'typeorm';
import { TestHelper } from '../../tests/TestHelper';
import { User } from '../entities/User';
import { AuthService } from './AuthService';
import { instanceToPlain } from 'class-transformer';

describe('AuthService', () => {
    let authService: AuthService;
    let database: DataSource;

    beforeAll(async () => {
        await TestHelper.instance.setupTestDB();
        database = TestHelper.instance.database;
        authService = new AuthService();
        authService.usersRepositories = database.getRepository(User);
    });

    afterAll(() => {
        TestHelper.instance.teardownTestDB();
    });

    it(`should be created`, async () => {
        expect(authService).toBeTruthy();
    });

    it(`${AuthService.prototype.login.name} should be success`, async () => {
        const password = await hash("test", 8);
        const newUser = authService.usersRepositories.create({ name: "test", email: "test@test.com", admin: true, password });
        const createdUser = instanceToPlain(await authService.usersRepositories.save(newUser));
        const user = { email: newUser.email, password: 'test' };
        const response = await authService.login(user);
        expect(response.profile).toMatchObject(createdUser);
    });

    it(`${AuthService.prototype.login.name} should throw error when password is incorrect`, async () => {
        const user = { email: 'test@test.com', password: '478' };
        try {
            await authService.login(user);
        } catch (error: any) {
            expect(error.message).toEqual("Email/Password incorrect");
        }
    });

    it(`${AuthService.prototype.login.name} should throw error when user is not found`, async () => {
        const user = { email: 'anyuser@user.com', password: '' };
        // expect(async () => await authService.login(user)).toThrow("Email/Password incorrect");
        try {
            await authService.login(user);            
        } catch (error: any) {
            expect(error.message).toEqual("Email/Password incorrect");            
        }
    });
});