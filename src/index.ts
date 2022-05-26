import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import errorHandler from './middlewares/error-handler.middlewares';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.routes';
import usersRoute from './routes/users.routes';
import bearerAthenticationMiddleware from './middlewares/bearer-authentication.middleware';

const app = express();

//configuraçoes da aplicaçao 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//configuraçoes de rota
app.use(bearerAthenticationMiddleware, usersRoute);
app.use(statusRoute);
app.use(authorizationRoute);

//configuraçao do handlers de erro
app.use(errorHandler);

//inicializaçao da aplicaçao
app.listen(3000, () => {
    console.log('aplicaçao execultanado!!!');
    console.log('http://localhost:3000/status')
})
