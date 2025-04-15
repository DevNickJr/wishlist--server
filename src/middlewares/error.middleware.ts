
import { Request, Response, NextFunction, Application } from 'express';
import ApiError from '../utils/ApiError';

export default function ErrorMiddleware (app: Application) {
    // custom 404 && this will replace default express Not Found response
    app.use((req, res) => {
        res.status(404).send('Sorry, Resource Not Found!')
    })

    // custom error handler && this will replace default express error respons
    app.use((err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
        const statusCode = err instanceof ApiError ? err.status : 500;
        const message = err.message || err
        console.log('error', `status: ${statusCode}, message: ${message}`)
        res.status(statusCode).json({
            success: false,
            message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        })
    })
}