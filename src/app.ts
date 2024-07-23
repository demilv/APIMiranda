import AuthMiddleware from './middleware/auth'
import express, {Request, Response, NextFunction} from 'express';
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();



// mongoose.connect('mongodb://user:pass@127.0.0.1:port/database', {autoIndex: false});

export const app = express();

app.use(express.json())
app.use(AuthMiddleware)

app.get('/', (req, res) =>{
    res.send('Salutations')
});

app.post('/login', (req, res)=> {
    const {username, password} = req.body
    if(username === 'asdf' && password === '1234') {
        const token = jwt.sign(JSON.stringify({id:1}), MYKEY)
        return res.json({token});
    }
    return res.status(401).json({error:true, message:'Not permitted'})
})

const routerRooms = require("./routes/roomRoutes")
app.use('/rooms', routerRooms);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    return res.status(status).json({error: true, message: (error.message && error.safe) ? error.message : 'Application error'})
})