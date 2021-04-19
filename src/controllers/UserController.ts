import express from 'express';
import UserService from '../services/UserService';
import argon2 from 'argon2';

import debug from 'debug';
const log: debug.IDebugger = debug('app:users-controller');

class UserController {
    async getAllUsers(req: express.Request, res: express.Response) {
        const users = await UserService.getAll();
        res.status(200).send(users);
    }

    async getUserById(req: express.Request, res: express.Response) {
        const user = await UserService.getOneById('mehdi');
        res.status(200).send(user);
    }

    // async createUser(req: express.Request, res: express.Response) {
    //     req.body.password = await argon2.hash(req.body.password);
    //     const userId = await UserService.create(req.body);
    //     res.status(201).send({ id: userId });
    // }

    // async patch(req: express.Request, res: express.Response) {
    //     if (req.body.password) {
    //         req.body.password = await argon2.hash(req.body.password);
    //     }
    //     log(await UserService.patchById(req.body.id, req.body));
    //     res.status(204).send();
    // }

    // async put(req: express.Request, res: express.Response) {
    //     req.body.password = await argon2.hash(req.body.password);
    //     log(await UserService.putById(req.body.id, req.body));
    //     res.status(204).send();
    // }

    // async removeUser(req: express.Request, res: express.Response) {
    //     log(await UserService.deleteById(req.body.id));
    //     res.status(204).send();
    // }
}

export default new UserController();