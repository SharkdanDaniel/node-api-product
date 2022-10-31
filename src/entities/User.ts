import { Exclude } from "class-transformer";
import { Entity, Column, ManyToMany, JoinTable, OneToOne } from "typeorm"
import { Avatar } from "./Avatar";
import { BaseEntity } from "./BaseEntity";
import { Product } from "./Product";

@Entity("users")
export class User extends BaseEntity {

    @Column({
        type: 'varchar',
        length: 100
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    email: string;

    @Column()
    password: string;

    @Column()
    admin: boolean;

    @OneToOne(() => Avatar, (avatar) => avatar.user)
    avatar?: Avatar;

    @ManyToMany(() => Product, (product) => product.users)
    products?: Product[];
}
