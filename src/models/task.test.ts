import { it, describe } from "node:test";
import assert from "node:assert";
import { Task } from "./task";

describe("Task basics", () => {
    it("should instantiate a test", () => {
        const task = new Task("test");
        assert.ok(task instanceof Task);
    });

    it("should set a title", () => {
        const task = new Task("new title");
        assert.strictEqual(task.getTitle(), "new title");
    });

    it("should set a description", () => {
        const task = new Task("test");
        task.setDescription("new description");
        assert.strictEqual(task.getDescription(), "new description");
    });

    it("should instantiate as new", () => {
        const task = new Task("test");
        assert.strictEqual(task.getStatus(), "New");
    });
});

describe("Task transitions", () => {
    it("should transition to in progress", () => {
        const task = new Task("test");
        task.start();
        assert.strictEqual(task.getStatus(), "In Progress");
    });

    it("should transition to done", () => {
        const task = new Task("test");
        task.start();
        task.finish();
        assert.strictEqual(task.getStatus(), "Done");
    });

    it("should transition to archived", () => {
        const task = new Task("test");
        task.archive();
        assert.strictEqual(task.getStatus(), "Archived");
    });

    it("should not transition to done if not in progress", () => {
        const task = new Task("test");
        assert.throws(() => {
            task.finish();
        });
    });
});
