import { Request, Response, NextFunction } from 'express';
import { Review as ReviewService } from '../services/review';
//import { Review as ReviewInterface } from '../interfaces/Review';

const fetchAllReviews = async () => {
    try {
        const reviews = await ReviewService.fetchAll();
        if (!reviews) {
            throw new Error('Reviews not found');
        }
        return reviews;
    } catch (e) {
        throw e;
    }
};

export const getAllReviews = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await fetchAllReviews();
        return res.json( reviews );
    } catch (e) {
        return next(e);
    }
};

export const getOneReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await fetchAllReviews();        
        const reviewIndex = parseInt(req.params.id, 10)-1;

        if (isNaN(reviewIndex) || reviewIndex < 0 || reviewIndex >= reviews.length) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const review = reviews[reviewIndex];
        return res.status(200).json(review);
    } catch (e) {
        return next(e);
    }
};
