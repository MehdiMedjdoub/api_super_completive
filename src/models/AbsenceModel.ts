import { ObjectId } from 'bson';
import { model, Schema, Model, Document } from 'mongoose';

interface IAbsence extends Document {
    subject: string;
    motive: string;
    isJustified: boolean;
    owner: ObjectId;
    files: [];
    date: Date;
}

const AbsenceSchema: Schema = new Schema({
    subject: { type: String, required: false },
    motive: { type: String, required: false },
    isJustified: { type: Boolean, required: true },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    files: [
        {
        type: Schema.Types.ObjectId,
        ref: "file"
        }
    ],
    date: { type: Date, required: true }
});

export const AbsenceModel: Model<IAbsence> = model('absence', AbsenceSchema);