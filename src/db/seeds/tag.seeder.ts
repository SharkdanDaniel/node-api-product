import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Tag } from '../../entities/Tag';
import { tagMock } from '../../../tests/mocks/testMocks';

export const tagsCount = 5;

export default class TagSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository = dataSource.getRepository(Tag);
        await repository.insert([
            {
                name: tagMock.name,
            }
        ]);

        // ---------------------------------------------------

        const userFactory = await factoryManager.get(Tag);
        // save 1 factory generated entity, to the database
        // await userFactory.save();

        // save 5 factory generated entities, to the database
        await userFactory.saveMany(tagsCount - 1);
    }
}