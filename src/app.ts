import type { Request, Response, Express } from 'express'
import express from 'express'
import ErrorMiddleware from '@/middlewares/error.middleware';
import PreRouteMiddleware from '@/middlewares/pre-route.middleware';
import router from './routes';

const app: Express = express();

PreRouteMiddleware(app)

// Home
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to Map Express' })
})

// Ping route for health checks
app.get('/ping', (req: Request, res: Response) => {
    res.status(200).json({ message: 'pong' })
})

app.use('/api/v1', router); 

// handle errors && 404
ErrorMiddleware(app)

export { app }