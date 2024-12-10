import jwt from 'jsonwebtoken';
import {User} from "@infrastructure/http/auth/user.model";

export class UserRepository {

    static async getUserByUsername(username: string): Promise<{ user: any; token: string } | null> {
        const user = await User.findOne({ where: { username } });
        if (!user) return null;

        const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret_key', {
            expiresIn: '1h',
        });

        return { user, token };
    }

    static async createUser(user: { username: string; password: string }): Promise<string> {
        const newUser = await User.create(user);

        const token = jwt.sign({ id: newUser.id, username: newUser.username },  'your_jwt_secret_key', {
            expiresIn: '1h',
        });

        return token;
    }
}