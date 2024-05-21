import { it, describe } from "node:test";
import assert from "node:assert";
import { User } from "./user";

describe("User basics", () => {
    it("should create a new user with a unique ID", () => {
        const user = new User("test@example.com", "password");
        assert.ok(user instanceof User);
        assert.ok(user.id);
    });
});

describe("Email validations", () => {
    it("should set the email address of the user", () => {
        const user = new User("test@example.com", "password");
        user.setEmail("newemail@example.com");
        assert.strictEqual(user.getEmail(), "newemail@example.com");
    });

    it("should throw an error for an invalid email address", () => {
        const user = new User("test@example.com", "password");
        assert.throws(() => {
            user.setEmail("invalidemail");
        }, Error);
    });
});

describe("Password validations", () => {
    it("should throw an error for a password shorter than 8 characters", () => {
        assert.throws(() => {
            new User("teste@teste.com", "pass");
        }, Error);
    });

    it("should set the password of the user", () => {
        const user = new User("teste@teste.com", "password");
        user.setPassword("newpassword");
        assert.ok(user.checkPassword("newpassword"));
    });

    it("should check the password of the user", () => {
        const user = new User("teste@teste.com", "password");
        assert.ok(user.checkPassword("password"));
        assert.ok(!user.checkPassword("wrongpassword"));
    });
});
