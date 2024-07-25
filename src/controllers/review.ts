import { Request, Response, NextFunction } from 'express';
import { Review as ReviewService } from '../services/review';
//import { Review as ReviewInterface } from '../interfaces/Review';

export const getAllReviews = (_req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = ReviewService.fetchAll();
        return res.json( reviews );
    } catch (e) {
        return next(e);
    }
};

export const getOneReview = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const review = ReviewService.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        return res.json( review );
    } catch (e) {
        return next(e);
    }
};
