import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface ICourse extends Document {
    name: string;
    speaker: string;
    faculty: string;
    class: string;
    promo: ObjectId;
    type: string;
    salle: string;
    date: string;
    attendance: ObjectId;
}

const CourseSchema: Schema = new Schema({
    name: { type: String, required: true },
    speaker: { type: String, required: true },
    faculty: { type: String, required: true },
    class: { type: String, required: true },
    promo: {
            type: Schema.Types.ObjectId,
            ref: 'promo'
        },
    type: { type: String, required: true },
    salle: { type: String, required: true },
    date: { type: String, required: true },
    attendance: {
        type: Schema.Types.ObjectId,
        ref: 'attendance'
    },
});

export const CourseModel: Model<ICourse> = model('course', CourseSchema);