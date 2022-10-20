import { hash } from "bcryptjs";
import { MigrationInterface, QueryRunner } from "typeorm"
import { v4 } from "uuid";
import { User } from "../../entities/User";

export class InsertUsers1666141312277 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                    id: v4(),
                    name: "Admin",
                    email: "admin@admin.com",
                    password: await hash("admin", 8),
                    admin: true
                },
            ])
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
