import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface ISubject extends Document {
  name: string;
  owner: ObjectId;
}

const SubjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'speaker'
},
});

export const SubjectModel: Model<ISubject> = model('subject', SubjectSchema);