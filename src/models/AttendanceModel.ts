import { ObjectId } from 'bson';
import { model, Schema, Model, Document } from 'mongoose';

interface IAttendance extends Document {
    isSend: boolean;
    course: ObjectId;
    date: string;
    students:[];
}

const AttendanceSchema: Schema = new Schema({
    isSend: { type: Boolean, required: false },
    date: { type: String, required: true },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course'
    },
    students: [
        {
        type: Schema.Types.ObjectId,
        ref: "student"
        }
    ],
});

export const AttendanceModel: Model<IAttendance> = model('attendance', AttendanceSchema);