import {UserRepository} from "@infrastructure/http/auth/user.repo";
import {User} from "@infrastructure/http/auth/user.model";

export class AuthService {

    static async register(username: string, password: string): Promise<String> {
        const existingUser = await UserRepository.getUserByUsername(username);
        if (existingUser) {
            throw new Error('Username already taken');
        }

        return await UserRepository.createUser({ username, password });
    }

    static async login(username: string, password: string): Promise<string> {
        const user: { user: User; token: string } | null = await UserRepository.getUserByUsername(username);
        if (!user || user.user.password !== password) {
            throw new Error('Invalid credentials');
        }
        return user.token;
    }


}