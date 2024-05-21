import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { taskRoutes } from "../routes/task";
import { userRoutes } from "../routes/user";
import { authRoutes } from "../routes/auth";
import { UserRepository } from "../repositories/user-repository";

const fastify = Fastify({
    logger: true,
});
interface CustomRequest extends FastifyRequest {
    body: {};
}

fastify.decorate('authenticate', async (request: CustomRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        reply.status(401).send({ error: 'Missing or invalid authorization header' });
        return;
    }

    const token = authHeader.split(' ')[1];
    const user = UserRepository.findByToken(token);
    if (!user) {
        reply.status(401).send({ error: 'Invalid token' });
        return;
    }

    request.body = { ...request.body, userId: user.id };
});



taskRoutes(fastify);
userRoutes(fastify);
authRoutes(fastify);

fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
