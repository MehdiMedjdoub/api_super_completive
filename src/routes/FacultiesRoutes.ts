import { CommonRoutesConfig } from './CommonRoutes';
import FacultyController from '../controllers/FacultyController';
import express from 'express';

export class FacultiesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'FacultiesRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/faculties`)
            .post(
                // AuthJwt.verifyToken, 
                FacultyController.createFaculty)
            .get(
                // AuthJwt.verifyToken, 
                FacultyController.getAllFaculties);

        this.app
            .route(`/faculties/:id`)
            .get(
                // AuthJwt.verifyToken, 
                FacultyController.getFacultyById)
            .delete(
                // AuthJwt.verifyToken, 
                FacultyController.deleteFacultyById)
            .put(
                // AuthJwt.verifyToken,
                 FacultyController.updateFacultyById);
                
        return this.app;
    }
}