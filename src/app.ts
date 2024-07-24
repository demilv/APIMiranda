import express, {Request, Response, NextFunction} from 'express';
//const mongoose = require("mongoose");
import dotenv from 'dotenv';
dotenv.config();
import routerRooms from './routes/roomRoutes';
import routerUsers from './routes/userRoutes';
import routerReviews from './routes/reviewRoutes';
import routerBookings from './routes/bookingRoutes';
import AuthMiddleware, { TokenAccess } from './middleware/auth';
import path from 'path';


export const app = express();

app.use(express.json())
app.use(TokenAccess())

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/rooms', AuthMiddleware, routerRooms);
app.use('/users', AuthMiddleware, routerUsers);
app.use('/reviews', AuthMiddleware, routerReviews);
app.use('/bookings', AuthMiddleware, routerBookings);


app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    return res.status(500).json({error: true, message: err.message || 'Application error'})
})