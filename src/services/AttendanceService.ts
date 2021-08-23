import { AttendanceModel } from '../models/AttendanceModel'
import { CourseModel } from '../models/CourseModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class AttendanceService implements CRUD {

    async getAll() {
        return AttendanceModel.find();
    }

    async getAllByCourse(courseId: any) {
        const attendances = await AttendanceModel.find({course: courseId}).populate('course').exec(); 
        const result = []
        result.push(courseId);
        result.push(attendances)
        return result;
    }

    async getAllByweek() {

        let week: any = this.getDaysOfCurrentWeek()
        let firstDay = week[0]
        let lastDay = week[week.length -1]

        return AttendanceModel.find({date: { $gte: firstDay, $lte: lastDay }});
    }

    async getAllByDayForWeek() {
        let week: any = this.getDaysOfCurrentWeek()
        let results:any = {}

        for(let i=1; i< week.length; i++) {
            let attendance = await AttendanceModel.find({date: week[i]}).exec()

            results[week[i]] = attendance 
        }

        return results
    }


    async getOneById(id: string) {
        return AttendanceModel.find({_id: id}).exec();
    }

    async create(req: any) {
        const courseId = req.params.courseId
        const attendance = new AttendanceModel(req.body);
        
        attendance.course = mongoose.Types.ObjectId(courseId);
        if(!req.body.isSend) {
            attendance.isSend = false
        }
        attendance.save();

        CourseModel.findOneAndUpdate({_id: courseId}, {$push: {attendance: attendance._id}}).exec()
    }

    async deleteById(id: string) {
        return AttendanceModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        return await AttendanceModel.findOneAndUpdate({_id: req.params.attendanceId}, req.body).exec();
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

export default new AttendanceService();