import { CommonRoutesConfig } from './CommonRoutes';
import PromoController from '../controllers/PromoController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class PromosRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PromosRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/promos`)
            .post(
                // AuthJwt.verifyToken, 
                PromoController.createPromo)
            .get(
                // AuthJwt.verifyToken, 
                PromoController.getAllPromo);
        
        this.app
            .route(`/promos/:id`)
            .delete(
                // AuthJwt.verifyToken, 
                PromoController.deletePromoById);
    
        return this.app;
    }
}