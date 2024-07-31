import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { initializeDatabase } from './mongodb/start'; 
import checkUser from './mongodb/HashingChecking/HashCheck';
import routerRooms from './routes/roomRoutes';
import routerUsers from './routes/userRoutes';
import routerReviews from './routes/reviewRoutes';
import routerBookings from './routes/bookingRoutes';
import AuthMiddleware from './middleware/auth';

dotenv.config();

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body;
    const authenticated = await checkUser(email, password);
    if (authenticated) {
        const token = jwt.sign({ email }, process.env.MYKEY || "secretKey", { expiresIn: "1800s" });
        res.cookie("Authorization", token, { httpOnly: true });
        return res.redirect('/');
    } else {
        return res.status(401).json({ error: true, message: 'Invalid credentials' });
    }
});

app.post('/logout', (_req: Request, res: Response, _next: NextFunction) => {
    res.clearCookie("Authorization");
    res.redirect('/');
});

app.use('/rooms', AuthMiddleware, routerRooms);
app.use('/users', AuthMiddleware, routerUsers);
app.use('/reviews', AuthMiddleware, routerReviews);
app.use('/bookings', AuthMiddleware, routerBookings);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    return res.status(500).json({ error: true, message: err.message || 'Application error' });
});

initializeDatabase().catch(err => console.log(err));
