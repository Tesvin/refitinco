import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js'
import transactionRouth from './routes/transactionRouth.js'
import cors from 'cors';
import { sequelize } from './database/connection.js';
dotenv.config();

const __dirname = path.resolve();

const app = express()

sequelize.sync()
.then()
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
  
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/transaction', transactionRouth);
//app.use('api/shares', calculateShares);

app.use(express.static(path.join(__dirname, '/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
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
