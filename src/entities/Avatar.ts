import { Exclude, Expose } from "class-transformer";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm"
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("avatars")
export class Avatar extends BaseEntity {

    @Column({
        name: "file_name",
        type: 'varchar',
        length: 200
    })
    fileName: string;
    
    @Column({
        name: "media_type",
        type: 'varchar',
        length: 50
    })
    mediaType: string;
    
    @Exclude()
    @Column()
    path: string;
    
    @OneToOne(() => User, (user) => user.avatar)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Expose()
    src?: string;
}
