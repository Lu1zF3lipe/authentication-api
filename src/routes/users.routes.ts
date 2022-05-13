import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';
import userRepository from "../repositories/user.repository";
import DatabaseError from "../models/errors/database.error.model";
import { CreateUserController } from "../controllers/CreateUserController";

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response) => {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).json(users);
});

usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string}>, res: Response) => {
    const uuid = req.params.uuid;
    const user = await userRepository.findByid(uuid);
    res.status(StatusCodes.OK).send(user);
});

usersRoute.post('/users', CreateUserController.handle);

usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string}>, res: Response) => {
    const uuid = req.params.uuid;
    const modfiedUser = req.body;

    modfiedUser.uuid = uuid;

    await userRepository.update(modfiedUser);
    res.status(StatusCodes.OK).send();
});

usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string}>, res: Response) => {
    const uuid = req.params.uuid;
    await userRepository.remove(uuid);
    res.sendStatus(StatusCodes.OK);
});


export default usersRoute;