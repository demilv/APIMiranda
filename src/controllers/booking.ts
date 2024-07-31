import { Request, Response, NextFunction } from 'express';
import { Booking as BookingService } from '../services/booking';
//import { Booking as BookingInterface } from '../interfaces/Booking';

export const getAllBookings = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = await BookingService.fetchAll();
        if(!bookings){
            return res.status(404).json({message: 'Bookings not found'});            
        }
        return res.json( bookings );
    } catch (e) {
        return next(e);
    }
};

export const getOneBooking = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const booking = await BookingService.getBooking(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return booking;
    }
    catch(e){
        return next(e)
    }
} 

