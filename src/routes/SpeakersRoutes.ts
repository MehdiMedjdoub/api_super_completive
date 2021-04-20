import { CommonRoutesConfig } from './CommonRoutes';
import SpeakerController from '../controllers/SpeakerController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class SpeakersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'SpeakersRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/speakers`)
            .post(AuthJwt.verifyToken, SpeakerController.createSpeaker)
            .get(AuthJwt.verifyToken, SpeakerController.getAllSpeakers);
    
        this.app
            .route(`/speakers/:id`)
            .get(AuthJwt.verifyToken, SpeakerController.getSpeakerById)
            .delete(AuthJwt.verifyToken, SpeakerController.deleteSpeakerById);
            
        return this.app;
    }
}