import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repositories/user-repository";

export function userRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: { email: string; password: string } }>(
        "/users",
        { preHandler: fastify.authenticate },
        async (request, reply) => {
            try {
                const { email, password } = request.body;
                const user = await UserRepository.create(email, password);
                reply.code(201).send(user);
            } catch (error) {
                if (error instanceof Error)
                    reply.code(400).send({ error: error.message });
            }
        }
    );
}
