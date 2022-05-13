import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "../repositories/user.repository";

class CreateUserController {
    public static async handle(request: Request, response: Response) {
        const newUser = request.body;
        const uuid = await userRepository.create(newUser);
        return response.status(StatusCodes.CREATED).send(uuid);
    }
}

export { CreateUserController }