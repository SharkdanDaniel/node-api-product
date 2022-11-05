import { TagDTO, TagListDTO, TagModel } from "../dtos/TagDTO";
import { Tag } from "../entities/Tag";

export class TagMapper {

    static toModel(tag: Tag) {
        return {
            id: tag.id,
            name: tag.name,
        } as TagModel
    }

    static toDTO(tag: Tag) {
        return {
            id: tag.id,
            name: tag.name,
            products: tag.products || [],
        } as TagDTO
    }

    static toListDTO(tags: Tag[]) {
        return tags.map((tag) => {
            return {
                id: tag.id,
                name: tag.name
            } as TagModel
        })
    }
}