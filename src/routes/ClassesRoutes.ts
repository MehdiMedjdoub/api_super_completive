import { CommonRoutesConfig } from './CommonRoutes';
import ClassController from '../controllers/ClassController';
import express from 'express';

export class ClassesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ClassesRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/classes`)
            .post(
                // AuthJwt.verifyToken, 
                ClassController.createClass)
            .get(
                // AuthJwt.verifyToken, 
                ClassController.getAllClasses);

        this.app
            .route(`/classes/:id`)
            .get(
                // AuthJwt.verifyToken, 
                ClassController.getClassById)
            .delete(
                // AuthJwt.verifyToken, 
                ClassController.deleteClassById)
            .put(
                // AuthJwt.verifyToken,
                 ClassController.updateClassById);
                
        return this.app;
    }
}