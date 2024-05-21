import express, { Express, NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { authRoutes } from "../routes/auth.routes";
import { taskRoutes } from "../routes/task.routes";
import { userRoutes } from "../routes/user.routes";

const app: Express = express();
app.use(express.json());

app.use(authRoutes);

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).send({
            error: "Missing or invalid authorization header",
        });
        return;
    }

    const token = authHeader.split(" ")[1];
    const user = UserRepository.findByToken(token);
    if (!user) {
        res.status(401).send({ error: "Invalid token" });
        return;
    }

    req.query.userId = user.id;
    next();
};

app.use(authenticate, taskRoutes);
app.use(authenticate, userRoutes);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
