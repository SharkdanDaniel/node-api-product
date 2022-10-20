import { Exclude } from "class-transformer";
import { PrimaryColumn, CreateDateColumn, UpdateDateColumn, Generated, PrimaryGeneratedColumn } from "typeorm"

export class BaseEntity {

    @PrimaryColumn()
    @Generated("uuid")
    readonly id: string;    

    @Exclude()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
