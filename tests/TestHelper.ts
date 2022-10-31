import { DataSource, DataSourceOptions, MigrationExecutor } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
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
        const options: DataSourceOptions & SeederOptions = {
            name: 'default',
            type: 'better-sqlite3',
            database: ':memory:',
            entities: ['src/entities/*.ts'],
            migrations: ['src/db/migrations/*.ts'],
            dropSchema: true,
            migrationsRun: true,
            synchronize: true,
            seeds: ['src/db/seeds/*.ts'],
            factories: ['src/db/factories/*.ts']        
        }
        this.dbConnect = new DataSource(options)
        await this.dbConnect.initialize();
    }
    
    async setupSeeders(factories: any[], seeds: any[]) {
        await runSeeders(this.dbConnect, {
            factories: [...factories],
            seeds: [...seeds],
        });
    }

    async teardownTestDB() {
        // const entityDeletionPromises = entities.map((entity: any) => async () => {
        //     const repository = this.dbConnect.getRepository(entity.name);
        //     await repository.query(`DELETE FROM ${entity.tableName}`);
        // });
        // await Promise.all(entityDeletionPromises);
        const migrationExecutor = new MigrationExecutor(this.dbConnect);
        const migrations = await migrationExecutor.getAllMigrations();
        for (const _ of migrations) {
            await this.dbConnect.undoLastMigration();
        }                
        this.dbConnect.destroy();
        this.testdb.close();
    }
}