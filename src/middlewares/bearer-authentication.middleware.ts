import { NextFunction, Request, Response } from "express";
import forbiddenError from "../models/errors/forbidden.error.model";
import User from "../models/user.model";
import JWT from "jsonwebtoken";


async function bearerAthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new forbiddenError('credenciaias nao informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Bearer' || !token) {
            throw new forbiddenError('tipo de autenticaçao invalido');
        } 

        const tokenPayload = JWT.verify(token, 'byakugan');

        if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
            throw new forbiddenError('token invalido');
        }

        const uuid = tokenPayload.sub;
        const user: User = {
            uuid: tokenPayload.sub,
            username: tokenPayload.username

        }
        req.user = user;
        next();

    } catch (error) {
        next(error);
    }

}

export default bearerAthenticationMiddleware;
