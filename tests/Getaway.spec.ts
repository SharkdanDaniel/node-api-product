import { describe, expect, test, beforeEach, beforeAll, afterAll } from '@jest/globals';
import { Gateway } from "./Gateway";
import { TestHelper } from "./TestHelper";

const gateway = new Gateway();

describe('Gateway Tests', () => {
    beforeAll(async () => {
        await TestHelper.instance.setupTestDB();
    });
    
    afterAll(() => {
        TestHelper.instance.teardownTestDB();
    });

    test('shoud be', () => {
        expect(true).toBeTruthy()
    })

    // test('should create a numbers map', async () => {
    //     const numbersMap = await gateway.createNumberMap('12345678', 'test');
    //     expect(numbersMap.phoneNumber).toBe('12345678');
    //     expect(numbersMap.home).toBe('test');
    // });

    // test('it should be able to return the home destination', async () => {
    //     const home = await gateway.getHomeDestination('12345678');
    //     expect(home).toBe('test');
    // });
});