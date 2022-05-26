import { Router } from "express";
import { UserController } from "../controllers/UserController";

const usersRoute = Router();

usersRoute.get('/users', UserController.findAllUsers);

usersRoute.get('/users/:uuid', UserController.findByid);

usersRoute.post('/users', UserController.create);

usersRoute.put('/users/:uuid', UserController.update);

usersRoute.delete('/users/:uuid', UserController.remove);


export default usersRoute;