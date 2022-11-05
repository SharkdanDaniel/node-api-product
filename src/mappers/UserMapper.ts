import { UserDTO, UserModel } from "../dtos/UserDTO";
import { User } from "../entities/User";

export class UserMapper {

    static toModel(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
        } as UserModel
    }

    static toDTO(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            avatar: user.avatar || [],
            products: user.products || []
        } as UserDTO
    }

    static toListDTO(users: User[]) {
        return users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                admin: user.admin,
            } as UserModel
        })
    }
}