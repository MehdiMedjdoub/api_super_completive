import { CommonRoutesConfig } from './CommonRoutes';
import DelayController from '../controllers/DelayController';
import express from 'express';

export class DelaysRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'DelaysRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/students/:studentId/delays`)
            .post(DelayController.createDelay)
            .get(DelayController.getAllDelays);

        this.app
            .route(`/students/:studentId/delays/:delayId`)
            .delete(DelayController.deleteDelayById)
            .get(DelayController.getDelayById)
            .put(DelayController.updateDelayById);            

        return this.app;
    }
}