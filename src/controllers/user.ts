import { Request, Response, NextFunction } from 'express';
import { User as UserService } from '../services/user';
//import { User as UserInterface } from '../interfaces/User';

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
    try{
        const user = await UserService.getUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return user;
    }
    catch(e){
        return next(e)
    }
} 
