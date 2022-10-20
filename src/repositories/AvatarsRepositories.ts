import { AppDataSource } from '../db/data-source';
import { Avatar } from '../entities/Avatar';

const dataSource = AppDataSource;

export const AvatarsRepositories = dataSource.getRepository(Avatar);