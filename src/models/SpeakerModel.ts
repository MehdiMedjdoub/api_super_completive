import { model, Schema, Model, Document } from 'mongoose';

interface ISpeaker extends Document {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    phone: string;
    adress: string;
    cp: string;
    city: string;
    subjects: [];
    siretNumber: string;
    firstLogin: Boolean;
    haveAvatar: Boolean;
}

const SpeakerSchema: Schema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: false },
    password: { type: String, required: false },
    phone: { type: String, required: true },
    adress: { type: String, required: true },
    cp: { type: String, required: true },
    city: { type: String, required: true },
    subjects: [
        {
        type: Schema.Types.ObjectId,
        ref: "subjects"
        }
    ],
    siretNumber: { type: String, required: true },
    firstLogin: { type: Boolean, required: false },
    haveAvatar: { type: Boolean, required: false }
});

export const SpeakerModel: Model<ISpeaker> = model('speaker', SpeakerSchema);