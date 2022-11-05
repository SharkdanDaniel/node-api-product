import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../entities/User';
import { hash } from 'bcryptjs';
import { userMock } from '../../../tests/mocks/testMocks';

export const usersCount = 5;

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository = dataSource.getRepository(User);
        const password = await hash(userMock.password, 8);
        await repository.insert([
            {
                name: userMock.name,
                email: userMock.email,
                password,
                admin: userMock.admin,
            }
        ]);

        // ---------------------------------------------------

        const userFactory = await factoryManager.get(User);
        // save 1 factory generated entity, to the database
        // await userFactory.save();

        // save 5 factory generated entities, to the database
        await userFactory.saveMany(usersCount - 2);
    }
}