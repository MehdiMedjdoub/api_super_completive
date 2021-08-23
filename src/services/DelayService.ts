import { StudentModel } from '../models/StudentModel'
import { DelayModel } from '../models/DelayModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class DelayService implements CRUD {

    async getAll() {
        return DelayModel.find();
    }

    async getAllByStudent(studentId: any) {
        const delays = await DelayModel.find({owner: studentId}).populate('student').exec(); 
        const result = []
        result.push(studentId);
        result.push(delays)
        return result;
    }

    async getAllByweek() {

        let week: any = this.getDaysOfCurrentWeek()
        let firstDay = week[0]
        let lastDay = week[week.length -1]

        return DelayModel.find({date: { $gte: firstDay, $lte: lastDay }});
    }

    async getAllByDayForWeek() {
        let week: any = this.getDaysOfCurrentWeek()
        let results:any = {}

        for(let i=1; i< week.length; i++) {
            let absence = await DelayModel.find({date: week[i]}).exec()

            results[week[i]] = absence 
        }

        return results
    }


    async getOneById(id: string) {
        return DelayModel.find({_id: id}).exec();
    }

    async create(req: any) {
        const userId = req.params.studentId
        const delay = new DelayModel(req.body);
        
        delay.owner = mongoose.Types.ObjectId(userId);
        if(!req.body.isJustified) {
            delay.isJustified = false
        }
        delay.save();

        StudentModel.findOneAndUpdate({_id: userId}, {$push: {delays: delay._id}}).exec()
    }

    async deleteById(id: string) {
        return DelayModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        return await DelayModel.findOneAndUpdate({_id: req.params.delayId}, req.body).exec();
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

export default new DelayService();