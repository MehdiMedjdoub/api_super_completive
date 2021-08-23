import { CommonRoutesConfig } from './CommonRoutes';
import NoteController from '../controllers/NoteController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class NotesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'NotesRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/notes`)
            .post(AuthJwt.verifyToken, NoteController.createNote)
            .get(AuthJwt.verifyToken, NoteController.getAllNotes);
        
        this.app
            .route(`/notes/:id`)
            .delete(AuthJwt.verifyToken, NoteController.deleteNoteById);
    
        this.app
        .route(`/employees/:id/notes`)
        .get(AuthJwt.verifyToken, NoteController.getAllNoteByOwner);       
        return this.app;
    }
}