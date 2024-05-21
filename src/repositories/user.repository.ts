import { randomUUID } from "crypto";
import { User } from "../models/user/user";

const users: User[] = [new User("admin@test.com", "password")];
const tokens: Record<string, string> = {};

export class UserRepository {
    static async create(email: string, password: string): Promise<User> {
        const user = new User(email, password);
        users.push(user);
        return user;
    }

    static async findByEmail(email: string): Promise<User | undefined> {
        return users.find((u) => u.getEmail() === email);
    }

    static async findById(id: string): Promise<User | undefined> {
        return users.find((u) => u.id === id);
    }

    static async getAll(): Promise<User[]> {
        return users;
    }

    static async update(
        id: string,
        email?: string,
        password?: string
    ): Promise<User | undefined> {
        const userIndex = users.findIndex((u) => u.id === id);
        if (userIndex === -1) return undefined;
        const user = users[userIndex];
        if (email) user.setEmail(email);
        if (password) user.setPassword(password);
        return user;
    }

    static async delete(id: string): Promise<boolean> {
        const userIndex = users.findIndex((u) => u.id === id);
        if (userIndex === -1) return false;
        users.splice(userIndex, 1);
        return true;
    }

    public static generateToken(user: User): string {
        const token = randomUUID();
        tokens[token] = user.id;

        return token;
    }

    public static findByToken(token: string): User | undefined {
        const userId = tokens[token];
        if (!userId) return undefined;

        return users.find((u) => u.id === userId);
    }
}
