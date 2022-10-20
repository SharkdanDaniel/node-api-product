import { instanceToPlain } from "class-transformer";
import { Product } from "../entities/Product";
import { TagsRepositories } from "../repositories/TagsRepositories";

interface ITagRequest {
    id?: string;
    name: string;
    products?: Product[];

}

export class TagService {
    async getAll(skip: any = 0, take: any = 10, order: any = 'name', sort: any = 'asc', search: any = '') {
        const tagsRepositories = TagsRepositories;
        try {
            const tags = await tagsRepositories.createQueryBuilder()
                .skip(skip)
                .take(take)
                .orderBy({ [order]: sort })
                .where('name LIKE :name', { name: `%${search}%` })
                .getMany()

            const total = await tagsRepositories.createQueryBuilder()
                .orderBy({ [order]: sort })
                .where('name LIKE :name', { name: `%${search}%` })
                .getCount()
            
            return { data: instanceToPlain(tags), total };

        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getById(id: string) {
        const tagsRepositories = TagsRepositories;
        const tags = await tagsRepositories.find({ where: { id }, relations: { products: true } });
        if(tags) return instanceToPlain(tags);
        throw { status: 404, message: "Tag not found" };
    }

    async create({ name }: ITagRequest) {
        const tagsRepositories = TagsRepositories;
        const tag = tagsRepositories.create({ name });
        await tagsRepositories.save(tag);
        return instanceToPlain(tag);
    }

    async update({ id, name, products }: ITagRequest) {
        const tagsRepositories = TagsRepositories;
        let tag = await tagsRepositories.findOneBy({ id });
        if (tag) {
            tag.name = name;
            tag.updatedAt = new Date();
            if(products) tag.products = products;  
            await tagsRepositories.save(tag);
            return instanceToPlain(tag);
        }
        throw ({ status: 404, message: 'Tag not found' });
    }

    async delete(id: string) {
        const tagsRepositories = TagsRepositories;
        const { affected } = await tagsRepositories.delete({ id });
        if(affected && affected > 0) return true;
        throw { status: 404, message: "Tag not found" };
    }
}