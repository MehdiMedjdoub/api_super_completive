import { model, Schema, Model, Document } from 'mongoose';

interface ISubject extends Document {
  name: string;
}

const SubjectSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export const SubjectModel: Model<ISubject> = model('subject', SubjectSchema);