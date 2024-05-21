import { randomUUID } from 'crypto';

export class User {
    public readonly id: string;
    constructor(
        private email: string,
        private password: string
    ) {
        this.id = randomUUID();
    }

    public setEmail(email: string): void {
        if (!/.+@.+\..+/.test(email)) {
            throw new Error("Invalid email");
        }
        this.email = email;
    }

    public getEmail(): string {
        return this.email;
    }

    public setPassword(password: string): void {
        if (password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        }
        //encrypt password
        this.password = password;
    }

    public getPassword(): string {
        return this.password;
    }
}