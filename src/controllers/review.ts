import { Request, Response, NextFunction } from 'express';
import { Review as ReviewService } from '../services/review';
//import { Review as ReviewInterface } from '../interfaces/Review';

export const getAllReviews = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await ReviewService.fetchAll();
        if(!reviews){
            return res.status(404).json({message: 'Reviews not found'});            
        }
        return res.json( reviews );
    } catch (e) {
        return next(e);
    }
};

export const getOneReview = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const review = await ReviewService.getReview(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        return review;
    }
    catch(e){
        return next(e)
    }
} 
