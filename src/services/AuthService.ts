import { compare } from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthRequest {
    email: string;
    password: string;
}

export class AuthService {

    public usersRepositories = UsersRepositories;

    async login({ email, password }: IAuthRequest) {
        const user = await this.usersRepositories.findOneBy({ email });
        if(!user) throw new Error("Email/Password incorrect");
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch) throw new Error("Email/Password incorrect");
        const token = sign(
            { email: user.email }, 
            "c49cfe9b8595f44183680fa21dc75fb5",
            { subject: user.id, expiresIn: "1d" }
        )
        return { token, profile: instanceToPlain(user) };
    }
}