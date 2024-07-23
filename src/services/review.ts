import roomReview from '../data/roomReview.json'

export class Review {
    static fetchAll() {
        return roomReview;
    }
}