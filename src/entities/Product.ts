import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity("products")
export class Product extends BaseEntity {
    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @ManyToMany(() => Tag, (tag) => tag.products)
    @JoinTable({ 
        name: "products_tags", 
        joinColumn: { name: "product_id" }, 
        inverseJoinColumn: { name: "tag_id" } 
    })
    tags?: Tag[]

    @ManyToMany(() => User, (user) => user.products)
    @JoinTable({ 
        name: "products_users", 
        joinColumn: { name: "product_id" }, 
        inverseJoinColumn: { name: "user_id" } 
    })
    users?: User[];
}