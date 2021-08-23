import { ObjectId } from 'bson';
import { model, Schema, Model, Document } from 'mongoose';

interface ISanction extends Document {
    motive: string;
    type: string;
    owner: ObjectId;
    startDate: Date;
    duration: number;
}

const SanctionSchema: Schema = new Schema({
    motive: { type: String, required: true },
    type: { type: String, required: true },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    startDate: { type: Date, required: false },
    duration: { type: Number, required: false }
});

export const SanctionModel: Model<ISanction> = model('sanction', SanctionSchema);