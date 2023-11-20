import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import connectMongodb from './database/connectMongodb.js';
import authRouter from './routes/auth.route.js';
import cors from 'cors'
import bodyParser from 'body-parser';
dotenv.config();

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/api/auth', authRouter);

const port = process.env.PORT;

connectMongodb().then(() => {
    try {
        app.listen(port, () => {
            console.log(`server connected to https://localhost:${port}`)
        }) 
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log('Invalid database connection...!')
})

  
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});