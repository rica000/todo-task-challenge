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

describe("Passowrd Validations", () => {
    it("should set the password of the user", () => {
        const user = new User("test@example.com", "password");
        user.setPassword("newpassword");
        assert.strictEqual(user.getPassword(), "newpassword");
    });

    it("should throw an error for a password less than 8 characters long", () => {
        const user = new User("test@example.com", "password");
        assert.throws(() => {
            user.setPassword("short");
        }, Error);
    });
});
