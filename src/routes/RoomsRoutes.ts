import { CommonRoutesConfig } from './CommonRoutes';
import RoomController from '../controllers/RoomController';
import express from 'express';

export class RoomsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'RoomsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/rooms`)
            .post(
                // AuthJwt.verifyToken, 
                RoomController.createRoom)
            .get(
                // AuthJwt.verifyToken, 
                RoomController.getAllRooms);

        this.app
            .route(`/rooms/:id`)
            .get(
                // AuthJwt.verifyToken, 
                RoomController.getRoomById)
            .delete(
                // AuthJwt.verifyToken, 
                RoomController.deleteRoomById)
            .put(
                // AuthJwt.verifyToken,
                 RoomController.updateRoomById);
                
        return this.app;
    }
}