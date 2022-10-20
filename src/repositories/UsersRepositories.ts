import { AppDataSource } from '../db/data-source';
import { User } from '../entities/User';

const dataSource = AppDataSource;

export const UsersRepositories = dataSource.getRepository(User);