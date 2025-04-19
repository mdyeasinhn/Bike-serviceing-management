import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors'
import { StatusCodes } from 'http-status-codes';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: "Bike Serviceing server"
    })
});


// Application routes
app.use('/api', router);


app.use( (req: Request, res: Response, next : NextFunction) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Route not found',
        error : {
            path : req.originalUrl,
            message : "Your requested method is not found"
        }
    })
})

// Global Error Handler
app.use(globalErrorHandler);

export default app;


