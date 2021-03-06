import express from 'express';
import AuthService from '../services/AuthService';

class AuthController {
    // async singUp(req: express.Request, res: express.Response) {
    //     const student = await AuthService.singUp(req.body);
    //     res.status(201).json({
    //         error: false,
    //         message: "Utilisateur crée avec succès",
    //         data: student
    //     });
    // }

    async singIn(req: express.Request, res: express.Response) {
        return await AuthService.singIn(req, res);
    }

    async singInWithGoogle(req: express.Request, res: express.Response) {
        return await AuthService.singInWithGoogle(req, res);
    }

    async singInWithLinkedin(req: express.Request, res: express.Response) {
        return await AuthService.singInWithLinkedin(req, res);
    }

    async forgotPassword(req: express.Request, res: express.Response) {
        return await AuthService.forgotPassword(req, res);
    }

    async passwordToken(req: express.Request, res: express.Response) {
        return await AuthService.passwordToken(req, res);
    }

    async resetPassword(req: express.Request, res: express.Response) {
        return await AuthService.resetPassword(req, res);
    }
}

export default new AuthController();