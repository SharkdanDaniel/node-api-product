import { instanceToPlain } from "class-transformer";
import { Repository } from "typeorm";
import { Product } from "../entities/Product";
import { Tag } from "../entities/Tag";
import { TagMapper } from "../mappers/TagMapper";
import { TagsRepositories } from "../repositories/TagsRepositories";

interface ITagRequest {
    id?: string;
    name: string;
    products?: Product[];

}

export class TagService {
    tagsRepositories: Repository<Tag>;

    constructor(private _tagRepo: Repository<Tag>) {
        this.tagsRepositories = _tagRepo;
    }

    async getAll(skip: any = 0, take: any = 10, order: any = 'name', sort: any = 'asc', search: any = '') {
        const tags = await this.tagsRepositories.createQueryBuilder()
            .skip(skip)
            .take(take)
            .orderBy({ [order]: sort })
            .where('name LIKE :name', { name: `%${search}%` })
            .getMany()

        const total = await this.tagsRepositories.createQueryBuilder()
            .orderBy({ [order]: sort })
            .where('name LIKE :name', { name: `%${search}%` })
            .getCount()
        
        return { data: TagMapper.toListDTO(tags), total };
    }

    async getById(id: string) {
        const tag = await this.tagsRepositories.findOne({ where: { id }, relations: { products: true } });
        if(tag) return TagMapper.toDTO(tag);
        throw { status: 404, message: "Tag not found" };
    }

    async create({ name }: ITagRequest) {
        const tag = this.tagsRepositories.create({ name });
        await this.tagsRepositories.save(tag);
        return TagMapper.toModel(tag);
    }

    async update({ id, name, products }: ITagRequest) {
        let tag = await this.tagsRepositories.findOneBy({ id });
        if (tag) {
            tag.name = name;
            tag.updatedAt = new Date();
            if(products) tag.products = products;  
            await this.tagsRepositories.save(tag);
            return TagMapper.toDTO(tag);
        }
        throw { status: 404, message: 'Tag not found' };
    }

    async delete(id: string) {
        const { affected } = await this.tagsRepositories.delete({ id });
        if(affected && affected > 0) return true;
        throw { status: 404, message: "Tag not found" };
    }
}