import { Request, Response, NextFunction } from 'express';
import { User as UserService } from '../services/user';
//import { User as UserInterface } from '../interfaces/User';
import { Types } from 'mongoose';


export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.fetchAll();
        if(!users){
            return res.status(404).json({message: 'Users not found'});            
        }
        return res.json( users );
    } catch (e) {
        return next(e);
    }
};


export const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const user = await UserService.getUser(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (e) {       
            return next(e);
        
    }
};

