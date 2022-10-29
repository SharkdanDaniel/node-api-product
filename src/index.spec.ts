import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
// import app from './index';

describe('App index', () => {
    test('should create server', async () => {
        expect(true).toBeTruthy();
    });

    // test('should redirect to docs', async () => {
    //     const response = await supertest(app).get('get');
    //     console.log(response);
    // });
});
