import { CommonRoutesConfig } from './CommonRoutes';
import DelayController from '../controllers/DelayController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class DelaysRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'DelaysRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/students/:studentId/delays`)
            .post(AuthJwt.verifyToken, DelayController.createDelay)
            .get(AuthJwt.verifyToken, DelayController.getAllDelays);

        this.app
            .route(`/students/:studentId/delays/:delayId`)
            .delete(AuthJwt.verifyToken, DelayController.deleteDelayById)
            .get(AuthJwt.verifyToken, DelayController.getDelayById)
            .put(AuthJwt.verifyToken, DelayController.updateDelayById);            

        return this.app;
    }
}