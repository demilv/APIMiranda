import bookingData from '../data/bookingsData.json'
import { Booking as BookingInterface } from '../interfaces/Booking';


export class Booking {

    private static bookings: BookingInterface[] = bookingData;

    static fetchAll() : BookingInterface[] {
        return bookingData as BookingInterface[];
    }

    static findById(id: number): BookingInterface | undefined {
        return this.bookings.find(booking => booking.id === id);
    }

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
    }
}