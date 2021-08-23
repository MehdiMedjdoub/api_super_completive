import { EmployeeModel } from '../models/EmployeeModel'
import { MessageModel } from '../models/MessageModel'
import { SpeakerModel } from '../models/SpeakerModel'
import { StudentModel } from '../models/StudentModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class MessageService implements CRUD {

    async getAll() {}

    async create(req: any) {}

    async getAllByRecipient(req: any) {
        let messages

        if(req.params.speakerId){ 
            messages = await MessageModel.find({speakerRecipient: req.params.speakerId}).populate('speaker').exec();
        }
        if(req.params.studentId){ 
            messages = await MessageModel.find({studentRecipient: req.params.studentId}).populate('student').exec();
        }
        if(req.params.employeeId){ 
            messages = await MessageModel.find({adminRecipient: "Service administratif"}).populate('employee').exec();
        }

        return messages
    }

    async getAllBySender(req: any) {
        let messages

        if(req.params.speakerId){ 
            messages = await MessageModel.find({
                speakerSender: req.params.speakerId, 
                status: { $ne: 'draft' }
            }).populate('speaker').exec();
        }
        if(req.params.studentId){ 
            messages = await MessageModel.find({
                studentSender: req.params.studentId, 
                status: { $ne: 'draft' }
            }).populate('student').exec();
        }
        if(req.params.employeeId){ 
            messages = await MessageModel.find({
                adminSender: "Service administratif", 
                status: { $ne: 'draft' }
            }).populate('employee').exec();
        }
        return messages
    }

    async getAllDraft(req: any) {
        let messages
        console.log(req.params)
        if(req.params.speakerId){ 
            messages = await MessageModel.find({speakerSender: req.params.speakerId, status: "draft"}).populate('speaker').exec();
        }
        if(req.params.studentId){ 
            messages = await MessageModel.find({studentSender: req.params.studentId, status: "draft"}).populate('student').exec();
        }
        if(req.params.employeeId){ 
            messages = await MessageModel.find({adminSender: "Service administratif", status: "draft"}).populate('employee').exec();
        }
        return messages
    }

    async getOneById(id: string) {
        return MessageModel.find({_id: id}).exec();
    }

    async send(req: any, res:any) {

        const message = new MessageModel(req.body);
        
        if (!message.date) {
            res.status(400).send({
                success: false,
                message: "le format de la date est erroné"
            })
        }

        if(req.body.userType === 'employee'){
            message.adminSender = "Service administratif";
            message.speakerRecipient = mongoose.Types.ObjectId(req.params.speakerId);
        }

        if(req.body.userType === 'speaker'){
            message.speakerSender = mongoose.Types.ObjectId(req.params.speakerId);
            message.adminRecipient = "Service administratif";
        }

        if(req.body.userType === 'student'){
            message.studentSender = mongoose.Types.ObjectId(req.params.studentId);
            message.adminRecipient = "Service administratif";
        }

        message.save();

        if (req.body.userType === 'student') {
            StudentModel.findOneAndUpdate({_id: req.params.studentId}, {$push: {delays: message._id}}).exec()
        }

        if (req.body.userType === 'speaker') {
            SpeakerModel.findOneAndUpdate({_id: req.params.speakerId}, {$push: {delays: message._id}}).exec()
        }
    }

    async deleteById(id: string) {
        return MessageModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        return await MessageModel.findOneAndUpdate({_id: req.params.messageId}, req.body).exec();
    }
}

export default new MessageService();