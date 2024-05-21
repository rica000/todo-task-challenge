import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Task, TaskStatus } from "../models/task";

const tasks: Task[] = [];

export function taskRoutes(fastify: FastifyInstance) {
    fastify.get("/tasks", async (_: FastifyRequest, reply: FastifyReply) => {
        reply.send(tasks);
    });

    fastify.post<{ Body: { title: string; description?: string } }>(
        "/tasks",
        async (request, reply) => {
            const { title, description } = request.body;
            const task = new Task(title, description);
            tasks.push(task);
            reply.code(201).send(task);
        }
    );

    fastify.get(
        "/tasks/:id",
        async (
            request: FastifyRequest<{ Params: { id: string } }>,
            reply: FastifyReply
        ) => {
            const taskId = request.params.id;
            const task = tasks.find((t) => t.id === taskId);
            if (!task) {
                reply.code(404).send({ error: "Task not found" });
                return;
            }
            reply.send(task);
        }
    );

    fastify.put<{
        Body: { title?: string; description?: string; status?: TaskStatus };
        Params: { id: string };
    }>("/tasks/:id", async (request, reply) => {
        try {
            const taskId = request.params.id;
            const { title, description, status } = request.body;
            const taskIndex = tasks.findIndex((t) => t.id === taskId);
            if (taskIndex === -1) {
                reply.code(404).send({ error: "Task not found" });
                return;
            }
            const task = tasks[taskIndex];
            if (title) task.setTitle(title);
            if (description) task.setDescription(description);
            if (status) task.setStatus(status);
            reply.send(task);
        } catch (error) {
            if (error instanceof Error)
                reply.code(400).send({ error: error.message });
        }
    });

    fastify.delete(
        "/tasks/:id",
        async (
            request: FastifyRequest<{ Params: { id: string } }>,
            reply: FastifyReply
        ) => {
            const taskId = request.params.id;
            const taskIndex = tasks.findIndex((t) => t.id === taskId);
            if (taskIndex === -1) {
                reply.code(404).send({ error: "Task not found" });
                return;
            }
            tasks.splice(taskIndex, 1);
            reply.code(204).send();
        }
    );
}
