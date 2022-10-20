import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { Product } from "../entities/Product";

interface IUserRequest {
    id?: string;
    name: string;
    email: string;
    password: string;
    admin?: boolean;
    products?: Product[];
}

export class UserService {
    async getAll(skip: any = 0, take: any = 10, order: any = 'name', sort: any = 'asc', search: any = '') {
        const usersRepository = UsersRepositories;
        try {
            const users = await usersRepository.createQueryBuilder()
                .skip(skip)
                .take(take)
                .orderBy({ [order]: sort })
                .where('name LIKE :name', { name: `%${search}%` })
                .orWhere('email LIKE :email', { email: `%${search}%` })
                .getMany()

            const total = await usersRepository.createQueryBuilder()
                .orderBy({ [order]: sort })
                .where('name LIKE :name', { name: `%${search}%` })
                .orWhere('email LIKE :email', { email: `%${search}%` })
                .getCount()
            
            return { data: instanceToPlain(users), total };

        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getById(id: string) {
        const usersRepositories = UsersRepositories;
        const user = await usersRepositories.findOneBy({ id });
        if(user) return instanceToPlain(user);
        throw { status: 404, message: "User not found" };
    }

    async create({ name, email, admin = false, password }: IUserRequest) {
        const usersRepository = UsersRepositories;
        if (!email) throw new Error("Email incorrect");
        const userAlreadyExists = await usersRepository.findOneBy({ email });
        if (userAlreadyExists) throw new Error("User already exists");
        const passwordHash = await hash(password, 8);
        const user = usersRepository.create({ name, email, admin, password: passwordHash });
        await usersRepository.save(user);
        if(user) return instanceToPlain(user);
        throw { status: 404, message: "User not found" };
    }

    async update({ id, name, email, admin, password, products }: IUserRequest) {
        const usersRepository = UsersRepositories;
        let user = await usersRepository.findOneBy({ id });
        if (user) {
            user.name = name;
            user.email = email;
            user.updatedAt = new Date();
            if (admin) user.admin = admin;
            if (password) user.password = password;
            if (products) user.products = products;
            await usersRepository.save(user);
            return instanceToPlain(user);
        }
        throw ({ status: 404, message: 'User not found' });
    }

    async delete(id: string) {
        const usersRepositories = UsersRepositories;
        const { affected } = await usersRepositories.createQueryBuilder()
            .delete()
            .where("email != :email", { email: "admin@admin.com" })
            .andWhere("id = :id", { id })
            .execute()
        if(affected && affected > 0) return true;
        throw { status: 404, message: "User not found" };
    }
}