import express, { Request, Response } from 'express';
import { UserRepository } from "../repositories/user.repository";

const router = express.Router();

router.post("/auth/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserRepository.findByEmail(email);
    if (!user || !user.checkPassword(password)) {
        res.status(401).send({ error: "Invalid credentials" });
        return;
    }
    const token = UserRepository.generateToken(user);
    res.send({ token });
});

export { router as authRoutes };