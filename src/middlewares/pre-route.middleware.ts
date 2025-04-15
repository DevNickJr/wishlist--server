import express, { type Express } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOptions } from '../config/cors.config';

export default function PreRouteMiddleware (app: Express) {
    app.use(cors(corsOptions));
    
    // Handle preflight requests explicitly
    app.options('*name', (req, res) => {
        res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.sendStatus(200); // Respond to preflight requests
    });
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: false })) // parses form submissions
    app.use(express.json()) // parses json
    app.use(helmet()) // additional security layer by auto setting some important headers
    app.disable('x-powered-by') // remove powered by express header for security purposes
    // { credentials: true, origin: true }
}