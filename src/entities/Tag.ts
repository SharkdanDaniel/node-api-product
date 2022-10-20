import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Product } from "./Product";

@Entity("tags")
export class Tag extends BaseEntity {
    @Column()
    name: string;

    @ManyToMany(() => Product, (product) => product.tags)
    products?: Product[]
}