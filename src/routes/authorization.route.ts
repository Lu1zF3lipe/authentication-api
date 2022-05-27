import { NextFunction, Request, Response,Router } from "express";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import forbiddenError from "../models/errors/forbidden.error.model";
import jwtAthenticationMiddleware from "../middlewares/jwt-authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token/validate', jwtAthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);

});

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {

        const user = req.user;

        if (!user) {
            throw new forbiddenError('usuario nao imformado');
        }
        
        const jwtPayload = { username: user.username };
        const jwtOptions = { subject: user?.uuid};
        const secretKey = 'byakugan';

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions)
        res.status(StatusCodes.OK).json({token: jwt});

});


export default authorizationRoute;