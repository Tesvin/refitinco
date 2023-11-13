import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import connectMongodb from './database/connectMongodb.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

const app = express()

app.use(express.json());
app.use(cookieParser());

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