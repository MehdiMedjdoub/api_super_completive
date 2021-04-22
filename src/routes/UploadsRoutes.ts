import { CommonRoutesConfig } from './CommonRoutes';
import UploadController from '../controllers/UploadController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class UploadsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UploadsRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/files/:userId/upload`).post(
            // AuthJwt.verifyToken, 
            UploadController.upload);
        this.app.route(`/files/:userId`).get(
            // AuthJwt.verifyToken, 
            UploadController.getFile);
        return this.app;
    }
}