import { NextFunction, Request, Response } from "express";
import DatabaseError from "../models/errors/database.error.model";
import { StatusCodes } from "http-status-codes";
import forbiddenError from "../models/errors/forbidden.error.model";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error instanceof DatabaseError) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    } else if (error instanceof forbiddenError) {
        res.sendStatus(StatusCodes.FORBIDDEN);
    } else {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}   

export default errorHandler;