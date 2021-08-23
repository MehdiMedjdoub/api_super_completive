import { CommonRoutesConfig } from './CommonRoutes';
import ResultController from '../controllers/ResultController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class ResultsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ResultsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/students/:studentId/results`)
            .get(AuthJwt.verifyToken, ResultController.getAllResults)
            .post(AuthJwt.verifyToken, ResultController.createResult);
        
        this.app
            .route(`/students/:studentId/results/:resultId`)
            .delete(AuthJwt.verifyToken, ResultController.deleteResultById)
            .get(AuthJwt.verifyToken, ResultController.getResultById)
            .put(AuthJwt.verifyToken, ResultController.updateResultById);;

        return this.app;
    }
}