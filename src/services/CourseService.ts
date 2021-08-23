import {CourseModel} from '../models/CourseModel'
import { AttendanceModel } from '../models/AttendanceModel';
import { CRUD } from '../interfaces/CrudInterface'
import mongoose from 'mongoose'

class CourseService implements CRUD {

    async getAll() {
        return CourseModel.find();
    }

    getOneById(firstName: string) {
        return CourseModel.find({firstName: firstName}).exec();
    }

    async create(newCourse: any) {
        const course = new CourseModel(newCourse);
        const attendance = new AttendanceModel()

        attendance.course = course._id
        attendance.isSend = false

        attendance.save()
        course.save();
    }

    async deleteById(id: string) {
        return CourseModel.deleteOne({_id: id}).exec();
    }

    // async putById(course: any) {
    //     return CourseModel.putUserById(id, resource);
    // }
}

export default new CourseService();