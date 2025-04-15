const whitelist = ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001', 'https://dev-backoffice.mapxpress.com.ng', 'https://backoffice.mapxpress.com.ng', 'backoffice.mapxpress.com.ng']

export const corsOptions =  {
    origin: function originFn (origin: string | undefined, callback: (a: Error | null, b?: boolean) => void) {
        // console.log('oring', origin)
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            console.error(`Blocked by CORS: ${origin}`); // Debug log for blocked origins
            callback(new Error('Not allowed by CORS'))
        }
    },
    preflightContinue: true,
    credentials: true, 
    optionsSuccessStatus: 200,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}