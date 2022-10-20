import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateProducts1666131250015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        isUnique: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                        length: "50"
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: true
                    },

                    {
                        name: "admin",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "avatar_id",
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
                // foreignKeys: [
                //     {
                //         name: "FKAvatarIdUsers",
                //         referencedTableName: "avatars",
                //         referencedColumnNames: ["id"],
                //         columnNames: ["avatar_id"],
                //         onDelete: "SET NULL",
                //         onUpdate: "SET NULL"
                //     },
                // ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
