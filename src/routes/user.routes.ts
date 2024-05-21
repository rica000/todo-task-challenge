import express, { Request, Response } from 'express';
import { UserRepository } from "../repositories/user.repository";

type PostBody = {
    email: string;
    password: string;
};

const router = express.Router();

router.post("/users", async (req: Request<object, object, PostBody>, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await UserRepository.create(email, password);
        res.status(201).send(user);
    } catch (error) {
        if (error instanceof Error)
            res.status(400).send({ error: error.message });
    }
});

export { router as userRoutes };