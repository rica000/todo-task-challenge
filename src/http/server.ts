import Fastify from "fastify";
import { taskRoutes } from "../routes/task";

const fastify = Fastify({
    logger: true,
});

fastify.get("/", function (request, reply) {
    reply.send({ hello: "world" });
});

taskRoutes(fastify);

fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
