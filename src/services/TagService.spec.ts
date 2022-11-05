import { describe, expect, test, beforeEach, afterEach, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import { DataSource } from 'typeorm';
import { tagMock } from '../../tests/mocks/testMocks';
import { TestHelper } from '../../tests/TestHelper';
import tagFactory from '../db/factories/tag.factory';
import TagSeeder, { tagsCount } from '../db/seeds/tag.seeder';
import { TagCreateDTO } from '../dtos/TagDTO';
import { Tag } from '../entities/Tag';
import { TagMapper } from '../mappers/TagMapper';
import { TagService } from './TagService';

describe(`${TagService.name}`, () => {
    let tagService: TagService;
    let database: DataSource;

    beforeAll(async () => {
        await TestHelper.instance.setupTestDB();
        await TestHelper.instance.setupSeeders([tagFactory], [TagSeeder]);
        database = TestHelper.instance.database;
        tagService = new TagService(database.getRepository(Tag));
    });

    afterAll(async () => {
        await TestHelper.instance.teardownTestDB();
    });

    test(`should be created`, async () => {
        expect(tagService).toBeTruthy();
    });

    test(`${TagService.prototype.getAll.name} should return Tag List`, async () => {
        const response = await tagService.getAll();
        expect(response.total).toBe(tagsCount);
        expect(response.data.length).toBe(tagsCount);
    });

    test(`${TagService.prototype.getById.name} should return an User by Id`, async () => {
        const tag = TagMapper.toDTO(await tagService.tagsRepositories.findOneBy({ name: tagMock.name }) as any);
        const response = await tagService.getById(tag?.id || '');
        expect(response).toMatchObject(tag as any);
    });

    test(`${TagService.prototype.getById.name} should throw error when Tag is not found`, async () => {
        try {
            await tagService.getById('');
        } catch (error: any) {
            expect(error.message).toMatch('Tag not found');
        }
    });

    test(`${TagService.prototype.create.name} should create new Tag successfully`, async () => {
        const newTag: TagCreateDTO = { name: 'newUser' }
        const response = await tagService.create(newTag);
        expect(response.name).toEqual(newTag.name);
    });    

    test(`${TagService.prototype.update.name} should update an Tag successfully`, async () => {
        const tagTest = TagMapper.toDTO(await tagService.tagsRepositories.findOneBy({ name: tagMock.name }) as any);
        tagTest.name = 'updatedTag';
        const response = await tagService.update(tagTest as any);
        expect(response).toMatchObject(tagTest as any);
    });

    test(`${TagService.prototype.update.name} should throw error when Tag is not found`, async () => {
        try {
            await tagService.update({ id: '', name: '' });
        } catch (error: any) {
            expect(error.message).toEqual('Tag not found');
        }
    });

    test(`${TagService.prototype.delete.name} should delete an Tag successfully`, async () => {
        const tagTest = TagMapper.toDTO(await tagService.tagsRepositories.findOneBy({ name: 'updatedTag' }) as any);
        const response = await tagService.delete(tagTest.id);
        expect(response).toBe(true);
    });

    test(`${TagService.prototype.delete.name} should throw error when Tag is not found`, async () => {
        try {
            await tagService.delete('');
        } catch (error: any) {
            expect(error.message).toEqual('Tag not found');
        }
    });    
});