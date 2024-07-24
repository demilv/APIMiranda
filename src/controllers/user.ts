import { Request, Response, NextFunction } from 'express';
import { User as UserService } from '../services/user';
//import { User as UserInterface } from '../interfaces/User';

export const getAllUsers = (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = UserService.fetchAll();
        return res.json({ users });
    } catch (e) {
        return next(e);
    }
};

export const getOneUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const user = UserService.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ user });
    } catch (e) {
        return next(e);
    }
};
