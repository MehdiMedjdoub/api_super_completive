import { CommonRoutesConfig } from './CommonRoutes';
import SubjectController from '../controllers/SubjectController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class SubjectsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'SubjectsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/subjects`)
            .post(
                // AuthJwt.verifyToken, 
                SubjectController.createSubject)
            .get(
                // AuthJwt.verifyToken, 
                SubjectController.getAllSubjects);
        
        this.app
            .route(`/subjects/speaker/:id`)
            .get(
                // AuthJwt.verifyToken, 
                SubjectController.getAllBySpeaker);

        this.app
            .route(`/subjects/:id`)
            .get(AuthJwt.verifyToken, SubjectController.getSubjectById)
            .delete(AuthJwt.verifyToken, SubjectController.deleteSubjectById)
            .put(AuthJwt.verifyToken, SubjectController.updateSubjectById);
                
        return this.app;
    }
}