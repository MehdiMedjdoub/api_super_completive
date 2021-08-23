import { model, Schema, Model, Document } from 'mongoose';

interface ICourse extends Document {
    name: string;
    speaker: string;
    faculty: string;
    class: string;
    promo: string;
    type: string;
    salle: string;
    date: string;
}

const CourseSchema: Schema = new Schema({
    name: { type: String, required: true },
    speaker: { type: String, required: true },
    faculty: { type: String, required: true },
    class: { type: String, required: true },
    promo: { type: String, required: false },
    type: { type: String, required: true },
    salle: { type: String, required: true },
    date: { type: String, required: true },
});

export const CourseModel: Model<ICourse> = model('course', CourseSchema);