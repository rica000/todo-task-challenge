import { it, describe } from "node:test";
import assert from "node:assert";
import { Task } from "./task";

describe("Task basics", () => {
    it("should instantiate a test", () => {
        const task = new Task("test", "test description", "userId");
        assert.ok(task instanceof Task);
    });

    it("should set a title", () => {
        const task = new Task("new title", "test description", "userId");
        assert.strictEqual(task.getTitle(), "new title");
    });

    it("should set a description", () => {
        const task = new Task("test", "test description", "userId");
        task.setDescription("new description");
        assert.strictEqual(task.getDescription(), "new description");
    });

    it("should instantiate as new", () => {
        const task = new Task("test", "test description", "userId");
        assert.strictEqual(task.getStatus(), "new");
    });
});

describe("Task transitions", () => {
    it("should transition to in progress", () => {
        const task = new Task("test", "test description", "userId");
        task.setStatus("in_progress");
        assert.strictEqual(task.getStatus(), "in_progress");
    });

    it("should transition to done", () => {
        const task = new Task("test", "test description", "userId");
        task.setStatus("in_progress");
        task.setStatus("done");
        assert.strictEqual(task.getStatus(), "done");
    });

    it("should transition to archived form new", () => {
        const task = new Task("test", "test description", "userId");
        task.setStatus("archived");
        assert.strictEqual(task.getStatus(), "archived");
    });

    it("should not transition to done if not in progress", () => {
        const task = new Task("test", "test description", "userId");
        assert.throws(() => {
            task.setStatus("done");
        });
    });
});
