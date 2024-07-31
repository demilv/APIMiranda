import { ReviewModel } from '../mongodb/Schemas/review';
import { APIError } from '../errors/APIerror';
import { Review as ReviewInterface } from '../interfaces/Review';


export class Review {

    static async fetchAll(): Promise<ReviewInterface[]> {
        try {
            const reviews = await ReviewModel.find({});
            return reviews as ReviewInterface[];
        } catch (error) {
            throw new APIError('Reviews not found: ' + 404);
        }
    }

    static async getReview(id: string){    
        const review = await ReviewModel.findById(id);        
        if (!review){
            throw new APIError('Review not found: ', 404);            
        }
        return review;
    }
    /*
    static save(newReview: ReviewInterface): ReviewInterface {
        this.reviews.push(newReview);
        return newReview;
    }

    static findByIdAndUpdate(id: number, updatedReviewData: Partial<ReviewInterface>): ReviewInterface | undefined {
        const index = this.reviews.findIndex(review => review.id === id);
        if (index === -1) return undefined;

        const updatedReview = { ...this.reviews[index], ...updatedReviewData } as ReviewInterface;
        this.reviews[index] = updatedReview;
        return updatedReview;
    }

    static findByIdAndDelete(id: number): ReviewInterface | undefined {
        const index = this.reviews.findIndex(review => review.id === id);
        if (index === -1) return undefined;

        const [deletedReview] = this.reviews.splice(index, 1);
        return deletedReview;
    }*/
}