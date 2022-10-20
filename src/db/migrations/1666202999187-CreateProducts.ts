import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateProducts1666202999187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
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
                        length: "100",
                        isUnique: true
                    },
                    {
                        name: "price",
                        type: "float"
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "100"
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
                //         name: "FKUserIdProducts",
                //         referencedTableName: "users",
                //         referencedColumnNames: ["id"],
                //         columnNames: ["user_id"],
                //         onDelete: "SET NULL",
                //         onUpdate: "SET NULL"
                //     },
                //     {
                //         name: "FKTagIdProducts",
                //         referencedTableName: "tags",
                //         referencedColumnNames: ["id"],
                //         columnNames: ["tag_id"],
                //         onDelete: "SET NULL",
                //         onUpdate: "SET NULL"
                //     },
                // ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products")
    }

}
