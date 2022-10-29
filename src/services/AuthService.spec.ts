import { describe, expect, test, beforeEach, beforeAll, afterAll } from '@jest/globals';
import Database from 'better-sqlite3';
import supertest from 'supertest';
import { DataSource } from 'typeorm';
import { TestHelper } from '../../tests/TestHelper';
import { User } from '../entities/User';
import { AuthService } from './AuthService';



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

    test('should create AuthService', async () => {
        expect(authService).toBeTruthy();
    });

    // test('should return auth response', async () => {
    //     const user = { email: 'user@user.com', password: '123456' }
    //     const response = await authService.login(user);
    //     expect(response).toEqual(user);
    // });
});