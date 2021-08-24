import {CourseModel} from '../models/CourseModel'
import { AttendanceModel } from '../models/AttendanceModel';
import { StudentModel } from '../models/StudentModel';
import { CRUD } from '../interfaces/CrudInterface'

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

        let datetime = new Date(course.date);
        let date = datetime.getFullYear()+'-' + (datetime.getMonth()+1) + '-'+datetime.getDate()
        attendance.date = date

        const students = await StudentModel.find({promo: course.promo}).exec()

        attendance.save().then(
            (data:any) => {
                data.students = students
                data.save()
            }
        )

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