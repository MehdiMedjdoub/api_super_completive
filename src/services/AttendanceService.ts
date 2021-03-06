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
        
        const attendances = await AttendanceModel
        .find({date: date})
        .populate({ 
            path: 'course',
            model: 'course',
            populate: [{
                path: 'speaker',
                model: 'speaker'
            },
            {
                path: 'name',
                model: 'subject'
            }], 
         })
        .populate('students')
        .exec()

        return attendances
    }

    async getOneById(id: string) {
        return AttendanceModel
        .findOne({_id: id})
        .populate({ 
            path: 'course',
            model: 'course',
            populate: [{
                path: 'promo',
                model: 'promo',
                populate: {
                    path: 'student',
                    model: 'student',
                },
            },{
                path: 'speaker',
                model: 'speaker',
            },{
                path: 'name',
                model: 'subject',
            }], 
         })
         .exec();
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