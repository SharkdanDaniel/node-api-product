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

describe(`${UserService.name}`, () => {
    let userService: UserService;
    let database: DataSource;

    beforeAll(async () => {
        await TestHelper.instance.setupTestDB();
        await TestHelper.instance.setupSeeders([userFactory], [UserSeeder]);
        database = TestHelper.instance.database;
        userService = new UserService();
        userService.usersRepositories = database.getRepository(User);
    });

    afterAll(async () => {
        await TestHelper.instance.teardownTestDB();
    });

    test(`should be created`, async () => {
        expect(userService).toBeTruthy();
    });

    test(`${UserService.prototype.getAll.name} should return User List`, async () => {
        const response = await userService.getAll();
        console.log(response)
        expect(response.total).toBe(usersCount);
        expect(response.data.length).toBe(usersCount);
    });

    // test(`${UserService.prototype.login.name} should throw error when password is incorrect`, async () => {
    //     const user = { email: 'test@test.com', password: '478' };
    //     try {
    //         await userService.login(user);
    //     } catch (error: any) {
    //         expect(error.message).toEqual("Email/Password incorrect");
    //     }
    // });

    // test(`${UserService.prototype.login.name} should throw error when user is not found`, async () => {
    //     const user = { email: 'anyuser@user.com', password: '' };
    //     // expect(async () => await authService.login(user)).toThrow("Email/Password incorrect");
    //     try {
    //         await userService.login(user);            
    //     } catch (error: any) {
    //         expect(error.message).toEqual("Email/Password incorrect");            
    //     }
    // });
});