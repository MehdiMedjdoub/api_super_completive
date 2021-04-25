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
            .post(AuthJwt.verifyToken, AbsenceController.createAbsence)
            .get(AuthJwt.verifyToken, AbsenceController.getAllAbsences)
        
        this.app
            .route(`/students/:studentId/absences/:absenceId`)
            .delete(AuthJwt.verifyToken, AbsenceController.deleteAbsenceById)
            .get(AuthJwt.verifyToken, AbsenceController.getAbsenceById)
            .put(AuthJwt.verifyToken, AbsenceController.updateDelayById);
        
        this.app
        .route(`/absences/weekly`)
        .get(AuthJwt.verifyToken, AbsenceController.getAllAbsencesByWeek);
        return this.app;
    }
}