import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateProductsUsers1666212029875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: "products_users",
                columns: [
                    {
                        name: "product_id",
                        type: "varchar"
                    },
                    {
                        name: "user_id",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("products_users")
    }
}
