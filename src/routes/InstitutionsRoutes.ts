import { CommonRoutesConfig } from './CommonRoutes';
import InstitutionController from '../controllers/InstitutionController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class InstitutionsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'InstitutionsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/institutions`)
            .post(
                // AuthJwt.verifyToken, 
                InstitutionController.createInstitution)
            .get(
                // AuthJwt.verifyToken, 
                InstitutionController.getAllInstitution);
        
        this.app
            .route(`/institutions/:id`)
            .get(InstitutionController.getInstitutionById)
            .delete(
                // AuthJwt.verifyToken, 
                InstitutionController.deleteInstitutionById);
    
        return this.app;
    }
}