import { DataSource } from 'typeorm';
import Database from 'better-sqlite3';

const entities = ['src/entities/*.ts'];
const migrations = ['src/db/migrations/*.ts'];

export class TestHelper {

    private static _instance: TestHelper;

    private constructor() { }

    public static get instance(): TestHelper {
        if (!this._instance) this._instance = new TestHelper();

        return this._instance;
    }

    private dbConnect!: DataSource;
    private testdb!: any;

    get database() {
        return this.dbConnect;
    }

    async setupTestDB() {
        this.testdb = new Database(':memory:', { verbose: console.log });
        this.dbConnect = new DataSource({
            name: 'default',
            type: 'better-sqlite3',
            database: ':memory:',
            entities: ['src/entities/*.ts'],
            migrations: ['src/db/migrations/*.ts'],
            dropSchema: true,
            migrationsRun: true,
            synchronize: true
        })
        await this.dbConnect.initialize();
    }

    async teardownTestDB() {
        // const entityDeletionPromises = entities.map((entity: any) => async () => {
        //     const repository = this.dbConnect.getRepository(entity.name);
        //     await repository.query(`DELETE FROM ${entity.tableName}`);
        // });
        // await Promise.all(entityDeletionPromises);
        this.dbConnect.destroy();
        this.testdb.close();
    }
}