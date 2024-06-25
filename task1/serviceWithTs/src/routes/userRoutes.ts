import express, { Request, Response } from 'express';
import axios from 'axios';
import User from '../db/models/User';
import { IRequestUser } from '../types';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { name, email } = req.body as IRequestUser;
    
    try {
        const user = await User.create({ name, email });
        await axios.post('http://localhost:3001/actions', {
            userId: user.dataValues.id,
            action: 'create',
            details: { name, email }
        });
        res.status(201).json(user);
    } catch (error) {
        if (typeof error === "string") {
            res.status(400).json({ error: error.toUpperCase() });
        } else if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

// Изменение пользователя
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params as {id: string};
    const { name, email } = req.body as IRequestUser;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.update({ name, email });
        await axios.post('http://localhost:3001/actions', {
            userId: id,
            action: 'update',
            details: { name, email }
        });
        res.json(user);
    } catch (error) {
        if (typeof error === "string") {
            res.status(400).json({ error: error.toUpperCase() });
        } else if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

// Получение списка пользователей
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        if (typeof error === "string") {
            res.status(500).json({ error: error.toUpperCase() });
        } else if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});

export default router;