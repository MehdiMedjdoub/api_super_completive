import { CommonRoutesConfig } from './CommonRoutes';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';
import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): express.Application {
        this.app
        .route(`/users`)
        .get(UserController.getUserById);

        return this.app;
    }
}