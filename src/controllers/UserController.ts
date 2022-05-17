import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "../repositories/user.repository";

class UserController {
    public static async create(request: Request, response: Response) {
        const newUser = request.body;
        const uuid = await userRepository.create(newUser);
        return response.status(StatusCodes.CREATED).send(uuid);
    }

    public static async findAllUsers(request: Request, response: Response) {
        const users = await userRepository.findAllUsers();
        response.status(StatusCodes.OK).json(users);
    }

    public static async findByid(request: Request<{ uuid: string}>, response: Response) {
        const uuid = request.params.uuid;
        const user = await userRepository.findByid(uuid);
        response.status(StatusCodes.OK).send(user);
    }

    public static async update(request: Request<{ uuid: string}>, response: Response) {
        const uuid = request.params.uuid;
        const modfiedUser = request.body;

        modfiedUser.uuid = uuid;

        await userRepository.update(modfiedUser);
        response.status(StatusCodes.OK).send();
    }

    public static async remove(request: Request<{ uuid: string}>, response: Response) {
        const uuid = request.params.uuid;
        await userRepository.remove(uuid);
        response.sendStatus(StatusCodes.OK);
    }
}

export { UserController }