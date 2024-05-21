import {
    randomUUID,
    createCipheriv,
    createDecipheriv,
    scryptSync,
    randomBytes,
} from "crypto";

export class User {
    public readonly id: string;
    private static readonly algorithm = "aes-192-cbc";
    private static readonly key = scryptSync(
        process.env.SECRET_KEY || "default_key",
        "salt",
        24
    );
    private static readonly ivLength = 16;

    constructor(
        private email: string,
        private password: string
    ) {
        this.id = randomUUID();
        this.setEmail(email);
        this.setPassword(password);
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

        const iv = randomBytes(User.ivLength);
        const cipher = createCipheriv(User.algorithm, User.key, iv);
        let encrypted = cipher.update(password, "utf8", "hex");
        encrypted += cipher.final("hex");
        this.password = iv.toString("hex") + ":" + encrypted;
    }

    public checkPassword(password: string): boolean {
        const [iv, encrypted] = this.password.split(":");
        const decipher = createDecipheriv(
            User.algorithm,
            User.key,
            Buffer.from(iv, "hex")
        );
        let decrypted = decipher.update(encrypted, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return password === decrypted;
    }
}
