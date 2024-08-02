import { Request, Response, NextFunction } from 'express';
import { Booking as BookingService } from '../services/booking';
//import { Booking as BookingInterface } from '../interfaces/Booking';

const fetchAllBookings = async () => {
    try {
        const bookings = await BookingService.fetchAll();
        if (!bookings) {
            throw new Error('Bookings not found');
        }
        return bookings;
    } catch (e) {
        throw e;
    }
};

export const getAllBookings = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = await fetchAllBookings();
        return res.json( bookings );
    } catch (e) {
        return next(e);
    }
};

export const getOneBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = await fetchAllBookings();        
        const bookingIndex = parseInt(req.params.id, 10)-1;

        if (isNaN(bookingIndex) || bookingIndex < 0 || bookingIndex >= bookings.length) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const booking = bookings[bookingIndex];
        return res.status(200).json(booking);
    } catch (e) {
        return next(e);
    }
};
