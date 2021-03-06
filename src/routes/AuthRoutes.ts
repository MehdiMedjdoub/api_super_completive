import {CommonRoutesConfig} from './CommonRoutes';
import express from 'express';
import AuthController from '../controllers/AuthController';

export class AuthRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }

    configureRoutes() {
        this.app.route(`/login`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            next();
        })
        .post(AuthController.singIn)
        ;

        this.app.route(`/google-login`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            next();
        })
        .post(AuthController.singInWithGoogle)
        ;

        this.app.route(`/linkedin-access-token`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            next();
        })
        .post(AuthController.singInWithLinkedin)
        ;

        this.app.route(`/forgot-password`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            next();
        })
        .post(AuthController.forgotPassword)
        ;

        this.app.route(`/employees/password-token`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            next();
        })
        .post(AuthController.passwordToken)
        ;

        this.app.route(`/reset-password`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            next();
        })
        .post(AuthController.resetPassword)
        ;
    return this.app;
    }
}