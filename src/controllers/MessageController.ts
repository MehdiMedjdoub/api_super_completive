import express from 'express';
import MessageService from '../services/MessageService';

class MessageController {
    async createMessage(req: express.Request, res: express.Response) {

        if( !req.body.date || !req.body.object || !req.body.content) {
            res.status(400).send({
                success: false,
                message: "Une ou plusieurs données obligatoires sont manquantes"
            })
        }

        const message = await MessageService.send(req, res);
        res.status(201).json({
            success: true,
            message: "Nouveau message envoyé",
            data: message
        });
    }

    async getAllMessages(req: express.Request, res: express.Response) {
        const messages = await MessageService.getAllByRecipient(req);
        res.status(200).json({
            success: true, 
            message: "Liste des messages reçus", 
            data: messages
        });
    }

    async getAllMessagesSends(req: express.Request, res: express.Response) {
        const messages = await MessageService.getAllBySender(req);
        res.status(200).json({
            success: true, 
            message: "Liste des messages envoyés", 
            data: messages
        });
    }

    async getAllDraftMessages(req: express.Request, res: express.Response) {
        const messages = await MessageService.getAllDraft(req);
        res.status(200).json({
            success: true, 
            message: "Liste des messages enregistrées dans brouillon", 
            data: messages
        });
    }

    async getMessageById(req: express.Request, res: express.Response) {
        const message = await MessageService.getOneById(req.params.messageId);
        res.status(200).json({
            success: true, 
            message: "message", 
            data: message
        });
    }

    async deleteMessageById(req: express.Request, res: express.Response) {
        const result = await MessageService.deleteById(req.params.messageId);
        res.status(200).json({
            success: true, 
            message: "le message a été supprimée", 
            data: result
        });
    }

    async updateMessageById(req: express.Request, res: express.Response) {
        const delay = await MessageService.updateById(req);
        res.status(200).json({
            success: true, 
            message: "Message mis à jour", 
            data: delay
        });
    }
}

export default new MessageController();