declare module "fastify" {
    interface FastifyInstance {
        authenticate: any;
    }
}

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TaskRepository } from "../repositories/task-repository";
import { TaskStatus } from "../models/task/task";

type PostBody = {
    title: string;
    description: string;
    userId: string;
};

type PutBody = PostBody & { status: TaskStatus };

type GetBody = Pick<PostBody, "userId">;

export function taskRoutes(fastify: FastifyInstance) {
    fastify.get(
        "/tasks",
        { preHandler: fastify.authenticate },
        async (
            request: FastifyRequest<{ Body: GetBody }>,
            reply: FastifyReply
        ) => {
            const tasks = await TaskRepository.getAllFromUserId(
                request.body.userId
            );
            reply.send(tasks);
        }
    );

    fastify.post<{ Body: PostBody }>(
        "/tasks",
        { preHandler: fastify.authenticate },
        async (request, reply) => {
            const { title, description, userId } = request.body;
            const task = await TaskRepository.create(
                title,
                description,
                userId
            );
            reply.code(201).send(task);
        }
    );

    fastify.put<{ Body: PutBody; Params: { id: string } }>(
        "/tasks/:id",
        { preHandler: fastify.authenticate },
        async (request, reply: FastifyReply) => {
            const { title, description, status, userId } = request.body;
            const task = await TaskRepository.update(
                userId,
                request.params.id,
                title,
                description,
                status
            );
            if (!task) {
                reply.code(404).send({ error: "Task not found" });
                return;
            }
            reply.send(task);
        }
    );
}
