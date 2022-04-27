import { NextFunction, Request, Response,Router } from "express";
import { buffer } from "stream/consumers";
import forbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

const authorizationRoute = Router();

authorizationRoute.post('/token', async (req: Request, res: Response, next: NextFunction) =>{
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
        console.log(user);

    } catch (error) {
        next(error);
    }
    // 97f00dea-7409-4190-b216-d63c6af8ff62
});

export default authorizationRoute;