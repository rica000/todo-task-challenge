import express, { Request, Response } from "express";
import { TaskRepository } from "../repositories/task.repository";
import { TaskStatus } from "../models/task/task";

type QueryParams = {
    userId: string;
};

type PostBody = {
    title: string;
    description: string;
    userId: string;
};

type PutBody = PostBody & { status: TaskStatus };

type GetBody = Pick<PostBody, "userId">;

const router = express.Router();

router.get(
    "/tasks",
    async (req: Request<object, object, GetBody, QueryParams>, res: Response) => {
        const { userId } = req.query;
        const tasks = await TaskRepository.getAllFromUserId(userId);
        res.send(tasks);
    }
);

router.post(
    "/tasks",
    async (req: Request<object, object, PostBody, QueryParams>, res: Response) => {
        const { userId } = req.query;
        const { title, description } = req.body;
        const task = await TaskRepository.create(title, description, userId);
        res.status(201).send(task);
    }
);

router.put(
    "/tasks/:id",
    async (req: Request<{ id: string }, object, PutBody, QueryParams>, res: Response) => {
        const { userId } = req.query;
        const { title, description, status } = req.body;
        const { id } = req.params;
        const updatedTask = await TaskRepository.update(
            userId,
            id,
            title,
            description,
            status
        );
        res.send(updatedTask);
    }
);

router.delete(
    "/tasks/:id",
    async (req: Request<{ id: string }, object, object, QueryParams>, res: Response) => {
        const { userId } = req.query;
        const { id } = req.params;
        const updatedTask = await TaskRepository.delete(userId, id);
        res.send(updatedTask);
    }
);

export { router as taskRoutes };
