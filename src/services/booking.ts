import { BookingModel } from '../mongodb/Schemas/booking';
import { APIError } from '../errors/APIerror';
import { Booking as BookingInterface } from '../interfaces/Booking';


export class Booking {

    static async fetchAll(): Promise<BookingInterface[]> {
        try {
            const bookings = await BookingModel.find({});
            return bookings as BookingInterface[];
        } catch (error) {
            throw new APIError('Bookings not found: ' + 404);
        }
    }

    static async getBooking(id: string){    
        const booking = await BookingModel.findById(id);        
        if (!booking){
            throw new APIError('Booking not found: ', 404);            
        }
        return booking;
    }
    /*
    static save(newBooking: BookingInterface): BookingInterface {
        this.bookings.push(newBooking);
        return newBooking;
    }

    static findByIdAndUpdate(id: number, updatedBookingData: Partial<BookingInterface>): BookingInterface | undefined {
        const index = this.bookings.findIndex(booking => booking.id === id);
        if (index === -1) return undefined;

        const updatedBooking = { ...this.bookings[index], ...updatedBookingData } as BookingInterface;
        this.bookings[index] = updatedBooking;
        return updatedBooking;
    }

    static findByIdAndDelete(id: number): BookingInterface | undefined {
        const index = this.bookings.findIndex(booking => booking.id === id);
        if (index === -1) return undefined;

        const [deletedBooking] = this.bookings.splice(index, 1);
        return deletedBooking;
    }*/
}