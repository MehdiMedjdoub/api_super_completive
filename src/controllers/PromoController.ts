import express from 'express';
import PromoService from '../services/PromoService';

class PromoController {
    async createPromo(req: express.Request, res: express.Response) {
        const promo = await PromoService.create(req.body);
        res.status(201).json({
            error: false,
            message: "La promo a été crée avec succès",
            data: promo
        });
    }

    async getAllPromo(req: express.Request, res: express.Response) {
        const promos = await PromoService.getAll();
        res.status(200).json({
            error: false, 
            message: "Toutes le promos", 
            data: promos
        });
    }

    async deletePromoById(req: express.Request, res: express.Response) {
        const promo = await PromoService.deleteById(req.body);
        res.status(201).json({
            error: false,
            message: "La promo a été supprimée",
            data: promo
        });
    }
    // async getUserById(req: express.Request, res: express.Response) {
    //     const user = await UserService.getOneById('mehdi');
    //     res.status(200).send(user);
    // }
}

export default new PromoController();