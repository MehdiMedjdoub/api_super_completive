import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface ICourse extends Document {
    name: ObjectId;
    speaker: ObjectId;
    promo: ObjectId;
    type?: string;
    room: ObjectId;
    date: string;
    attendance: ObjectId;
}

const CourseSchema: Schema = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
    },
    speaker: {
        type: Schema.Types.ObjectId,
        ref: 'speaker'
    },
    promo: {
        type: Schema.Types.ObjectId,
        ref: 'promo'
    },
    type: { type: String, required: false },
    room: { type: Schema.Types.ObjectId,
        ref: 'room'
    },
    date: { type: String, required: true },
    attendance: {
        type: Schema.Types.ObjectId,
        ref: 'attendance'
    },
});

export const CourseModel: Model<ICourse> = model('course', CourseSchema);