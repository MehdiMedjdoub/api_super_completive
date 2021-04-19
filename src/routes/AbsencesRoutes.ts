import { CommonRoutesConfig } from './CommonRoutes';
import AbsenceController from '../controllers/AbsenceController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class AbsencesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AbsencesRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/students/:studentId/absences`)
            .post(AbsenceController.createAbsence)
            .get(AbsenceController.getAllAbsences);
        
        this.app
            .route(`/students/:studentId/absences/:absenceId`)
            .delete(AbsenceController.deleteAbsenceById)
            .get(AbsenceController.getAbsenceById);
        
        return this.app;
    }
}