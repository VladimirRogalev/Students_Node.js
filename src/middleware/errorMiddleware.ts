import {NextFunction, Request,Response} from 'express';

const errorMiddleware = (err: any, req: Request, res:Response, next: NextFunction)=> {
    const status =  err.status || 500;
    const message =err.message|| "Internal server Error";
    res.status(status).json({
        timestamp: new Date().toISOString(),
        status: status,
        error: "Not found",
        message: message,
        path: req.originalUrl,
    });
};

export default errorMiddleware;