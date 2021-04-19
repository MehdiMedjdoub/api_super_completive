import { StudentModel } from '../models/StudentModel'
import { AbsenceModel } from '../models/AbsenceModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class AbsenceService implements CRUD {

    async getAll() {
        return AbsenceModel.find();
    }

    async getAllByStudent(studentId: any) {
        return AbsenceModel.find({owner: studentId}).populate('student').exec(); 
    }

    async getOneById(id: string) {
        return AbsenceModel.find({_id: id}).exec();
    }

    async create(req: any) {
        const userId = req.params.studentId
        const absence = new AbsenceModel(req.body);

        absence.owner = mongoose.Types.ObjectId(userId);
        if(!req.body.isJustified) {
            absence.isJustified = false
        }
        absence.save();

        StudentModel.findOneAndUpdate({_id: userId}, {$push: {absences: absence._id}}).exec()
    }

    async deleteById(id: string) {
        return AbsenceModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        return await AbsenceModel.findOneAndUpdate({_id: req.params.delayId}, req.body).exec();
    }
}

export default new AbsenceService();