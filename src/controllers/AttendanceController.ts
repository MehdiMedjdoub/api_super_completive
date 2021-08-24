import express from 'express';
import AttendancesService from '../services/AttendanceService';

class AttendanceController {
    async createAttendance(req: express.Request, res: express.Response) {

        const attendance = await AttendancesService.create(req);
        res.status(201).json({
            succes: true,
            message: "Nouvelle feuille de présence ajoutée",
            data: attendance
        });
    }

    async getAllAttendancesByDay(req: express.Request, res: express.Response) {
        const attendances = await AttendancesService.getAllByDay();
        res.status(200).json({
            success: true, 
            message: "Liste des feuilles de présence du jour", 
            data: attendances
        });
    }

    async getAllAttendances(req: express.Request, res: express.Response) {
        const delays = await AttendancesService.getAll();
        res.status(200).json({
            success: true, 
            message: "Liste des feuilles de présence", 
            data: delays
        });
    }

    async getAttendanceById(req: express.Request, res: express.Response) {
        const attendance = await AttendancesService.getOneById(req.params.attendanceId);
        res.status(200).json({
            success: true, 
            message: "feuille de présence", 
            data: attendance
        });
    }

    async deleteAttendanceById(req: express.Request, res: express.Response) {
        const attendance = await AttendancesService.deleteById(req.params.attendanceId);
        res.status(200).json({
            success: true, 
            message: "feuille de présence supprimé"
        });
    }

    async updateAttendanceById(req: express.Request, res: express.Response) {
        const attendance = await AttendancesService.updateById(req);
        res.status(200).json({
            success: true, 
            message: "feuille de présence mis à jour", 
            data: attendance
        });
    }
}

export default new AttendanceController();