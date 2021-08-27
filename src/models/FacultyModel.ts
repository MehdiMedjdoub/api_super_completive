import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface IFaculty extends Document {
  name: string;
}

const FacultySchema: Schema = new Schema({
  name: { type: String, required: true }
});

export const FacultyModel: Model<IFaculty> = model('faculty', FacultySchema);