import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAvatars1666207695198 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "avatars",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        isUnique: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "file_name",
                        type: "varchar",
                        length: "200"
                    },                    
                    {
                        name: "path",
                        type: "varchar",
                    },                    
                    {
                        name: "media_type",
                        type: "varchar",
                        length: "50"
                    },                   
                    {
                        name: "user_id",
                        type: "varchar",
                        isNullable: true
                    },                   
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUserIdAvatar",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("avatars")
    }
}
