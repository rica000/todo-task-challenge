import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repositories/user-repository";

export function authRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: { email: string; password: string } }>(
        "/auth/login",
        async (request: FastifyRequest<{Body: {email: string, password: string}}>, reply: FastifyReply) => {
            const { email, password } = request.body;
            const user = await UserRepository.findByEmail(email);
            if (!user || !user.checkPassword(password)) {
                reply.code(401).send({ error: "Invalid credentials" });
                return;
            }
            const token = UserRepository.generateToken(user);
            reply.send({ token });
        }
    );
}
