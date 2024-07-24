import express, {Request, Response, NextFunction} from 'express';
//const mongoose = require("mongoose");
import dotenv from 'dotenv';
dotenv.config();
import routerRooms from './routes/roomRoutes';
import AuthMiddleware, { TokenAccess } from './middleware/auth';


/*
mongoose.connect('mongodb://user:pass@127.0.0.1:port/database', { autoIndex: false })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));*/
export const app = express();

app.use(express.json())
app.use(TokenAccess())

app.get('/', (_req, res) =>{
    res.send('Salutations')
});

app.use('/rooms', AuthMiddleware, routerRooms);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    return res.status(500).json({error: true, message: err.message || 'Application error'})
})