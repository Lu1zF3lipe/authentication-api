import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';
import userRepository from "../repositories/user.repository";
import DatabaseError from "../models/errors/database.error.model";
import { UserController } from "../controllers/UserController";

const usersRoute = Router();

usersRoute.get('/users', UserController.findAllUsers);

usersRoute.get('/users/:uuid', UserController.findByid);

usersRoute.post('/users', UserController.create);

usersRoute.put('/users/:uuid', UserController.update);

usersRoute.delete('/users/:uuid', UserController.remove);


export default usersRoute;