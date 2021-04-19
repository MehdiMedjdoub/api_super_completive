import { CommonRoutesConfig } from './CommonRoutes';
import SanctionController from '../controllers/SanctionController';
import express from 'express';

export class SanctionsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'SanctionsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/students/:studentId/sanctions`)
            .post(SanctionController.createSanction)
            .get(SanctionController.getAllSanctions);
        
        this.app
            .route(`/students/:studentId/sanctions/:sanctionId`)
            .delete(SanctionController.deleteSanctionById)
            .get(SanctionController.getSanctionById)
            .put(SanctionController.updateSanctionById);
        
        return this.app;
    }
}