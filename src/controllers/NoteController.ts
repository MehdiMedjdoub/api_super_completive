import express from 'express';
import NoteService from '../services/NoteService';

class NoteController {
    async createNote(req: express.Request, res: express.Response) {
        const note = await NoteService.create(req);
        res.status(201).json({
            success: true,
            message: "La note a été crée avec succès",
            data: note
        });
    }

    async getAllNotes(req: express.Request, res: express.Response) {
        const notes = await NoteService.getAll();
        res.status(200).json({
            succes: true, 
            message: "Liste des cours", 
            data: notes
        });
    }

    async deleteNoteById(req: express.Request, res: express.Response) {
        const note = await NoteService.deleteById(req.params.id);
        res.status(201).json({
            success: true,
            message: "La note a été supprimée",
            data: note
        });
    }
    async getOneNoteById(req: express.Request, res: express.Response) {
        const note = await NoteService.getOneById(req.body.id);
        res.status(200).send(note);
    }

    async getAllNoteByOwner(req: express.Request, res: express.Response) {
        const note = await NoteService.getAllByOwner(req.params.id);
        res.status(200).send(note);
    }
}

export default new NoteController();