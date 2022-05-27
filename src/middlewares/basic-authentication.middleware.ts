import { NextFunction, Request, Response } from "express";
import forbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";


async function basicAuthenticationMiddleware (req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new forbiddenError('credenciaias nao informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Basic' || !token) {
            throw new forbiddenError('tipo de autenticaçao invalido');
        } 

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
        const [username, password] = tokenContent.split(':');

        if (!username || !password) {
            throw new forbiddenError('Credencias nao preenchindas');
        }
        
        const user = await userRepository.findByusenameandpassword(username, password);

        if(!user){
            throw new forbiddenError('usuario ou senha invalido')
        }

        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
}

export default basicAuthenticationMiddleware;