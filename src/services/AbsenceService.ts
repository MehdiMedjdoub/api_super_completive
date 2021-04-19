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

    async create(newAbsence: any) {
        const userId = newAbsence.userId
        const id = mongoose.Types.ObjectId();
        const absence = new AbsenceModel(newAbsence);

        absence.owner = mongoose.Types.ObjectId(userId);
        absence.save();

        StudentModel.findOneAndUpdate({_id: userId}, {$push: {absences: absence._id}}).exec()
    }

    async deleteById(id: string) {
        return AbsenceModel.deleteOne({_id: id}).exec();
    }
}

export default new AbsenceService();