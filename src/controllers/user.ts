import { Request, Response, NextFunction } from 'express';
import { User as UserService } from '../services/user';
//import { User as UserInterface } from '../interfaces/User';

const fetchAllUsers = async () => {
    try {
        const users = await UserService.fetchAll();
        if (!users) {
            throw new Error('Users not found');
        }
        return users;
    } catch (e) {
        throw e;
    }
};


export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await fetchAllUsers();
        return res.json( users );
    } catch (e) {
        return next(e);
    }
};


export const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await fetchAllUsers();
        const userIndex = parseInt(req.params.id, 10)-1;

        if (isNaN(userIndex) || userIndex < 0 || userIndex >= users.length) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = users[userIndex];
        return res.status(200).json(user);
    } catch (e) {       
            return next(e);
        
    }
};

