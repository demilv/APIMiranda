import { Request, Response, NextFunction } from 'express';
import { Booking as BookingService } from '../services/booking';
//import { Booking as BookingInterface } from '../interfaces/Booking';

export const getAllBookings = (_req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = BookingService.fetchAll();
        return res.json({ bookings });
    } catch (e) {
        return next(e);
    }
};

export const getOneBooking = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const booking = BookingService.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.json({ booking });
    } catch (e) {
        return next(e);
    }
};
