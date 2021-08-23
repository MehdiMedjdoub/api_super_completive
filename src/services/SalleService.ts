import {SalleModel} from '../models/SalleModel'
import { CRUD } from '../interfaces/CrudInterface'
import mongoose from 'mongoose'

class CourseService implements CRUD {

    async getAll() {
        return SalleModel.find();
    }

    getOneById(firstName: string) {
        return SalleModel.find({firstName: firstName}).exec();
    }

    async create(newCourse: any) {
        const course = new SalleModel(newCourse);
        course.save();
    }

    async deleteById(id: string) {
        return SalleModel.deleteOne({_id: id}).exec();
    }

    // async putById(course: any) {
    //     return CourseModel.putUserById(id, resource);
    // }
}

export default new CourseService();