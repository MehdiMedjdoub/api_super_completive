import { CommonRoutesConfig } from './CommonRoutes';
import MessageController from '../controllers/MessageController';
import express from 'express';

export class MessagesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'MessagesRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/speakers/:speakerId/messages`)
            .get(MessageController.getAllMessages)
            .post(MessageController.createMessage);
        
        this.app
            .route(`/speakers/:speakerId/messages/sends`)
            .get(MessageController.getAllMessagesSends)
        
        this.app
            .route(`/speakers/:speakerId/messages/draft`)
            .get(MessageController.getAllDraftMessages)
            
        this.app
            .route(`/speakers/:speakerId/messages/:messageId`)
            .delete(MessageController.deleteMessageById)
            .get(MessageController.getMessageById)
            .put(MessageController.updateMessageById);

        this.app
            .route(`/students/:studentId/messages`)
            .get(MessageController.getAllMessages)
            .post(MessageController.createMessage);
        
        this.app
            .route(`/Students/:studentId/messages/:messageId`)
            .delete(MessageController.deleteMessageById)
            .get(MessageController.getMessageById)
            .put(MessageController.updateMessageById);

        this.app
            .route(`/employees/:employeeId/messages`)
            .get(MessageController.getAllMessages)
            .post(MessageController.createMessage);
        
        this.app
            .route(`/Employees/:employeeId/messages/:messageId`)
            .delete(MessageController.deleteMessageById)
            .get(MessageController.getMessageById)
            .put(MessageController.updateMessageById);
        return this.app;
    }
}