import { CommonRoutesConfig } from './CommonRoutes';
import SanctionController from '../controllers/SanctionController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class SanctionsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'SanctionsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/students/:studentId/sanctions`)
            .post(SanctionController.createAbsence)
            .get(SanctionController.getAllSanctions);
        
        this.app
            .route(`/students/:studentId/sanctions/:sanctionId`)
            .delete(SanctionController.deleteSanctionById);
        
        return this.app;
    }
}