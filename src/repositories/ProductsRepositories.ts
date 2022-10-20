import { AppDataSource } from '../db/data-source';
import { Product } from '../entities/Product';

const dataSource = AppDataSource;

export const ProductsRepositories = dataSource.getRepository(Product);