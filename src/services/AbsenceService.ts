import { StudentModel } from '../models/StudentModel'
import { AbsenceModel } from '../models/AbsenceModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class AbsenceService implements CRUD {

    async getAll() {
        return AbsenceModel.find();
    }

    async getAllByStudent(studentId: any) {
        const absences = await AbsenceModel.find({owner: studentId}).populate('student').exec(); 
        const result = []
        result.push(studentId);
        result.push(absences)
        return result;
    }

    async getAllByweek() {

        let week: any = this.getDaysOfCurrentWeek()
        let firstDay = week[0]
        let lastDay = week[week.length -1]

        return AbsenceModel.find({date: { $gte: firstDay, $lte: lastDay }});
    }

    async getAllByDayForWeek() {
        let week: any = this.getDaysOfCurrentWeek()
        let results:any = {}

        for(let i=1; i< week.length; i++) {
            let absence = await AbsenceModel.find({date: week[i]}).exec()

            results[week[i]] = absence 
        }

        return results
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

    getDaysOfCurrentWeek() {
        let curr = new Date 
        let week = []

        for (let i = 0; i <= 5; i++) {
        let first = curr.getDate() - curr.getDay() + i
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
        week.push(day)
        }
        return week
    }
}

export default new AbsenceService();