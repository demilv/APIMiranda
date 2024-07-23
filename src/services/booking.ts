import bookingsData from '../data/bookingsData.json'

export class Booking {
    static fetchAll() {
        return bookingsData;
    }
}