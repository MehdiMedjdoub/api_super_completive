import { AttendanceModel } from '../models/AttendanceModel'
import { CourseModel } from '../models/CourseModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class AttendanceService implements CRUD {

    async getAll() {
        return AttendanceModel.find();
    }

    async getAllByDay() {

        let datetime = new Date();
        let date = datetime.getFullYear()+'-' + (datetime.getMonth()+1) + '-'+datetime.getDate()

        return await AttendanceModel.find({
            //isSend: false, 
            date: date
        }).exec()
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
}

export default new AttendanceService();