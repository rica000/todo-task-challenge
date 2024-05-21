import { Task, TaskStatus } from "../models/task/task";

const tasks: Record<string, Task[]> = {};

export class TaskRepository {
    static async create(
        title: string,
        description: string,
        userId: string
    ): Promise<Task> {
        const task = new Task(title, description, userId);
        if (tasks[userId]) tasks[userId].push(task);
        else tasks[userId] = [task];
        return task;
    }

    static async getAllFromUserId(userId: string): Promise<Task[]> {
        return tasks[userId];
    }

    static async findById(
        taskId: string,
        userId: string
    ): Promise<Task | undefined> {
        return tasks[userId].find((t) => t.id === taskId);
    }

    static async update(
        userId: string,
        id: string,
        title?: string,
        description?: string,
        status?: TaskStatus
    ): Promise<Task | undefined> {
        const taskIndex = tasks[userId].findIndex((t) => t.id === id);
        if (taskIndex === -1) return undefined;
        const task = tasks[userId][taskIndex];
        if (title) task.setTitle(title);
        if (description) task.setDescription(description);
        if (status) task.setStatus(status);
        return task;
    }
}
