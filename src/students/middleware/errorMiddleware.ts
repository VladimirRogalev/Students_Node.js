import {NextFunction, Request,Response} from 'express';

const errorMiddleware = (err: { status:number; message:string }, req: Request, res:Response, next: NextFunction)=> {
    const status =  err.status || 500 ;
    const message =err.message|| "Internal server Error";
    res.status(status).json({
        timestamp: new Date().toISOString(),
        status: status,
        error: status ===404 ? "Not found" : "Error",
        message: message,
        path: req.originalUrl,
    });
};

export default errorMiddleware;