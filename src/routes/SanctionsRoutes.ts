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
            .post(AuthJwt.verifyToken, SanctionController.createSanction)
            .get(AuthJwt.verifyToken, SanctionController.getAllSanctions);
        
        this.app
            .route(`/students/:studentId/sanctions/:sanctionId`)
            .delete(AuthJwt.verifyToken, SanctionController.deleteSanctionById)
            .get(AuthJwt.verifyToken, SanctionController.getSanctionById)
            .put(AuthJwt.verifyToken, SanctionController.updateSanctionById);
        
        return this.app;
    }
}