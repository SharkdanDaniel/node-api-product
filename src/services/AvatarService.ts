import { instanceToPlain } from "class-transformer";
import { UploadedFile } from "express-fileupload";
import { AvatarsRepositories } from "../repositories/AvatarsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";
import fs from "fs";
import { AvatarMapper } from "../mappers/AvatarMapper";
const pathService = require('path');

interface IAvatarRequest {
    id?: string;
    user_id?: string;
    file: UploadedFile;
}

export class AvatarService {
    async getById(id: string) {
        const avatarsRepositories = AvatarsRepositories;
        const avatar = await avatarsRepositories.findOne({ where: { id }, relations: { user: true } });
        if (avatar) {
            const path = pathService.join(__dirname, '../uploads', avatar.fileName);
            const image = await fs.readFileSync(path).toString('base64');
            if(image) avatar.src = `data:image/${avatar.mediaType};base64, ${image}`;

            // await fs.readFile(path, (err, data) => {
            //     if(err) throw err;
            //     src = `data:image/${avatar.mediaType};base64, ${data.toString('base64')}`;
            // })
            return AvatarMapper.toDTO(avatar)
        };
        throw { status: 404, message: "Avatar not found" };
    }

    async create({ file, user_id }: IAvatarRequest) {
        const avatarsRepositories = AvatarsRepositories;
        const fileName = file.md5 + Math.floor(Math.random() * 245) + file.name.slice(file.name.lastIndexOf('.'));
        const path = pathService.join(__dirname, '../uploads', fileName);
        const user = await UsersRepositories.findOneByOrFail({ id: user_id });        
        const avatar = await avatarsRepositories.create({
            fileName,
            mediaType: file.mimetype,
            user,
            path
        });
        await avatarsRepositories.save(avatar);
        file.mv(path, (err: any) => {
            if (err) throw new Error(err);
            return file.name
        })
        return AvatarMapper.toDTO(avatar);
    }

    async update({ file, id }: IAvatarRequest) {
        const avatarsRepositories = AvatarsRepositories;
        const fileName = file.md5 + Math.floor(Math.random() * 245) + file.name.slice(file.name.lastIndexOf('.'));
        const newPath = pathService.join(__dirname, '../uploads', fileName);
        let avatar = await avatarsRepositories.findOneBy({ id });
        if (avatar) {
            const oldPath = pathService.join(__dirname, '../uploads', avatar.fileName);
            avatar.fileName = fileName;
            avatar.updatedAt = new Date();
            avatar.mediaType = file.mimetype; 
            await avatarsRepositories.save(avatar);
            file.mv(newPath, (err: any) => {
                if (err) throw new Error(err);
                return file.name
            })
            fs.unlink(oldPath, (err) => {
                if(err) throw err;
            })
            return AvatarMapper.toDTO(avatar);
        }
        throw ({ status: 404, message: 'Avatar not found' });
    }

    async delete(id: string) {
        const avatarsRepositories = AvatarsRepositories;
        const { affected } = await avatarsRepositories.delete({ id });
        if(affected && affected > 0) return true;
        throw { status: 404, message: "Avatar not found" };
    }
}