import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateProductsTags1666227765725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: "products_tags",
                columns: [
                    {
                        name: "product_id",
                        type: "varchar"
                    },
                    {
                        name: "tag_id",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("products_tags")
    }
}
