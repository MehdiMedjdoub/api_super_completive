import { CommonRoutesConfig } from './CommonRoutes';
import ResultController from '../controllers/ResultController';
import express from 'express';

export class ResultsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ResultsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/students/:studentId/results`)
            .get(ResultController.getAllResults)
            .post(ResultController.createResult);
        
        this.app
            .route(`/students/:studentId/results/:resultId`)
            .delete(ResultController.deleteResultById)
            .get(ResultController.getResultById)
            .put(ResultController.updateResultById);;

        return this.app;
    }
}