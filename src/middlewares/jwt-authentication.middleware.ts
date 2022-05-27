import { NextFunction, Request, Response } from "express";
import forbiddenError from "../models/errors/forbidden.error.model";
import User from "../models/user.model";
import JWT from "jsonwebtoken";


async function jwtAthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new forbiddenError('credenciaias nao informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Bearer' || !token) {
            throw new forbiddenError('tipo de autenticaçao invalido');
        } 
        
        try {
            const tokenPayload = JWT.verify(token, 'byakugan');
            
            if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
                throw new forbiddenError('token invalido');
            }
            
            const user: User = {
                uuid: tokenPayload.sub,
                username: tokenPayload.username
            }
            
            req.user = user;
            next();
            
        } catch (error) {
            throw new forbiddenError('token invalido');
        }

    } catch (error) {
        next(error);
    }

}

export default jwtAthenticationMiddleware;
