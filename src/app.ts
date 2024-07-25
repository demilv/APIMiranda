import express, {Request, Response, NextFunction} from 'express';
//const mongoose = require("mongoose");
import dotenv from 'dotenv';
dotenv.config();
import routerRooms from './routes/roomRoutes';
import routerUsers from './routes/userRoutes';
import routerReviews from './routes/reviewRoutes';
import routerBookings from './routes/bookingRoutes';
import AuthMiddleware from './middleware/auth';
import path from 'path';
import  jwt  from 'jsonwebtoken';
import cookieParser from 'cookie-parser'


export const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body;
    if (email === 'kdeveral0@nifty.com' && password === '1') {
        const token = jwt.sign({email, password}, process.env.MYKEY || "secretKey", {expiresIn: "1800s"});
        res.cookie("Authorization", token, {httpOnly: true})
        return res.redirect('/')
        } else {
        return res.status(401).json({error: true, message: 'Invalid credentials'});
    }
});

app.post('/logout', (_req: Request, res: Response, _next: NextFunction) => {
    res.clearCookie("Authorization")
    res.redirect('/')
})

app.use('/rooms', AuthMiddleware, routerRooms);
app.use('/users', AuthMiddleware, routerUsers);
app.use('/reviews', AuthMiddleware, routerReviews);
app.use('/bookings', AuthMiddleware, routerBookings);


app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    return res.status(500).json({error: true, message: err.message || 'Application error'})
})