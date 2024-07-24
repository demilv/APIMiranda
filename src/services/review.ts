import reviewData from '../data/roomReview.json'
import { Review as ReviewInterface } from '../interfaces/Review';


export class Review {

    private static reviews: ReviewInterface[] = reviewData;

    static fetchAll() : ReviewInterface[] {
        return reviewData as ReviewInterface[];
    }

    static findById(id: number): ReviewInterface | undefined {
        return this.reviews.find(review => review.id === id);
    }

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
    }
}