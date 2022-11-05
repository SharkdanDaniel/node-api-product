import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { Product } from "../entities/Product";
import { Brackets, Repository } from "typeorm";
import { UserMapper } from "../mappers/UserMapper";
import { UserListDTO } from "../dtos/UserDTO";
import { User } from "../entities/User";

interface IUserRequest {
    id?: string;
    name: string;
    email: string;
    password: string;
    admin?: boolean;
    products?: Product[];
}

export class UserService {
    usersRepositories: Repository<User>;

    constructor(private _userRepo: Repository<User>) {
        this.usersRepositories = _userRepo;
    }

    async getAll(skip: any = 0, take: any = 10, order: any = 'name', sort: any = 'asc', search: any = '') {
        const users = await this.usersRepositories.createQueryBuilder()
            .skip(skip)
            .take(take)
            .orderBy({ [order]: sort })
            .where('email != :email', { email: 'admin@admin.com' })
            .andWhere(
                new Brackets((qb) => {
                    qb.where('name LIKE :name', { name: `%${search}%` })
                    .orWhere('email LIKE :email', { email: `%${search}%` })
                })
            )
            .getMany()

        const total = await this.usersRepositories.createQueryBuilder()
            .orderBy({ [order]: sort })
            .where('name LIKE :name', { name: `%${search}%` })
            .orWhere('email LIKE :email', { email: `%${search}%` })
            .getCount()
        
        return { data: UserMapper.toListDTO(users), total } as UserListDTO;
    }

    async getById(id: string) {
        const user = await this.usersRepositories.findOneBy({ id });
        if(user) return UserMapper.toDTO(user);
        throw { status: 404, message: "User not found" };
    }

    async create({ name, email, admin = false, password }: IUserRequest) {
        if (!email) throw new Error("Email incorrect");
        const userAlreadyExists = await this.usersRepositories.findOneBy({ email });
        if (userAlreadyExists) throw new Error("User already exists");
        const passwordHash = await hash(password, 8);
        const user = this.usersRepositories.create({ name, email, admin, password: passwordHash });
        await this.usersRepositories.save(user);
        return UserMapper.toModel(user);
    }

    async update({ id, name, email, admin, password, products }: IUserRequest) {
        let user = await this.usersRepositories.findOneBy({ id });
        if (user) {
            user.name = name;
            user.email = email;
            user.updatedAt = new Date();
            if (admin) user.admin = admin;
            if (password) user.password = password;
            if (products) user.products = products;
            await this.usersRepositories.save(user);
            return UserMapper.toDTO(user);
        }
        throw ({ status: 404, message: 'User not found' });
    }

    async delete(id: string) {
        const { affected } = await this.usersRepositories.createQueryBuilder()
            .delete()
            .where("email != :email", { email: "admin@admin.com" })
            .andWhere("id = :id", { id })
            .execute()
        if(affected && affected > 0) return true;
        throw { status: 404, message: "User not found" };
    }
}