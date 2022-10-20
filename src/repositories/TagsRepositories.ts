import { AppDataSource } from '../db/data-source';
import { Tag } from '../entities/Tag';

const dataSource = AppDataSource;

export const TagsRepositories = dataSource.getRepository(Tag);