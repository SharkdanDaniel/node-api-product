import { instanceToPlain } from "class-transformer";
import { UploadedFile } from "express-fileupload";
import { AvatarsRepositories } from "../repositories/AvatarsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAvatarRequest {
    id?: string;
    user_id?: string;
    file: UploadedFile;
}

export class AvatarService {
    async getById(id: string) {
        const avatarsRepositories = AvatarsRepositories;
        const avatar = await avatarsRepositories.findOne({ where: { id }, relations: { user: true } });
        if (avatar) return instanceToPlain(avatar);
        throw { status: 404, message: "Tag not found" };
    }

    async create({ file, user_id }: IAvatarRequest) {
        const avatarsRepositories = AvatarsRepositories;
        const path = 'public/uploads/' + file.name;
        const user = await UsersRepositories.findOneByOrFail({ id: user_id })
        const avatar = await avatarsRepositories.create({
            fileName: file.name,
            mediaType: file.mimetype,
            path,
            user
        });
        await avatarsRepositories.save(avatar);
        file.mv(path, (err: any) => {
            if (err) throw new Error(err);
            return file.name
        })
        return instanceToPlain(avatar);
    }

    // async update({ id, name, products }: IAvatarRequest) {
    //     const tagsRepositories = TagsRepositories;
    //     let tag = await tagsRepositories.findOneBy({ id });
    //     if (tag) {
    //         tag.name = name;
    //         tag.updatedAt = new Date();
    //         if(products) tag.products = products;  
    //         await tagsRepositories.save(tag);
    //         return instanceToPlain(tag);
    //     }
    //     throw ({ status: 404, message: 'Tag not found' });
    // }

    // async delete(id: string) {
    //     const tagsRepositories = TagsRepositories;
    //     const { affected } = await tagsRepositories.delete({ id });
    //     if(affected && affected > 0) return true;
    //     throw { status: 404, message: "Tag not found" };
    // }
}