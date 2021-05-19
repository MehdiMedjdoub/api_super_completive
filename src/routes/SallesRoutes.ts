import { CommonRoutesConfig } from './CommonRoutes';
import SalleController from '../controllers/SalleController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class SallesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CoursesRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/courses`)
            .post(AuthJwt.verifyToken, SalleController.createSalle)
            .get(AuthJwt.verifyToken, SalleController.getAllSalles);
        
        this.app
            .route(`/courses/:id`)
            .delete(AuthJwt.verifyToken, SalleController.deleteSalleById);
    
        return this.app;
    }
}