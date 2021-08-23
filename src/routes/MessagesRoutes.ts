import { CommonRoutesConfig } from './CommonRoutes';
import MessageController from '../controllers/MessageController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class MessagesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'MessagesRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/speakers/:speakerId/messages`)
            .get(AuthJwt.verifyToken, MessageController.getAllMessages)
            .post(AuthJwt.verifyToken, MessageController.createMessage);
        
        this.app
            .route(`/speakers/:speakerId/messages/sends`)
            .get(AuthJwt.verifyToken, MessageController.getAllMessagesSends)
        
        this.app
            .route(`/speakers/:speakerId/messages/draft`)
            .get(AuthJwt.verifyToken, MessageController.getAllDraftMessages)
            
        this.app
            .route(`/speakers/:speakerId/messages/:messageId`)
            .delete(AuthJwt.verifyToken, MessageController.deleteMessageById)
            .get(AuthJwt.verifyToken, MessageController.getMessageById)
            .put(AuthJwt.verifyToken, MessageController.updateMessageById);

        this.app
            .route(`/students/:studentId/messages`)
            .get(AuthJwt.verifyToken, MessageController.getAllMessages)
            .post(AuthJwt.verifyToken, MessageController.createMessage);
        
        this.app
            .route(`/students/:studentId/messages/sends`)
            .get(AuthJwt.verifyToken, MessageController.getAllMessagesSends)
        
        this.app
            .route(`/students/:studentId/messages/draft`)
            .get(AuthJwt.verifyToken, MessageController.getAllDraftMessages)

        this.app
            .route(`/students/:studentId/messages/:messageId`)
            .delete(AuthJwt.verifyToken, MessageController.deleteMessageById)
            .get(MessageController.getMessageById)
            .put(MessageController.updateMessageById);

        this.app
            .route(`/employees/:employeeId/messages`)
            .get(AuthJwt.verifyToken, MessageController.getAllMessages)
            .post(AuthJwt.verifyToken, MessageController.createMessage);
        
        this.app
            .route(`/employees/:employeeId/messages/:messageId`)
            .delete(AuthJwt.verifyToken, MessageController.deleteMessageById)
            .get(AuthJwt.verifyToken, MessageController.getMessageById)
            .put(AuthJwt.verifyToken, MessageController.updateMessageById);

        this.app
            .route(`/employees/:employeeId/messages/sends`)
            .get(AuthJwt.verifyToken, MessageController.getAllMessagesSends)
        
        this.app
            .route(`/employees/:employeeId/messages/draft`)
            .get(AuthJwt.verifyToken, MessageController.getAllDraftMessages)
        return this.app;
    }
}