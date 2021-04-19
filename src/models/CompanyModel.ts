import { model, Schema, Model, Document } from 'mongoose';

interface ICompany extends Document {
  tutorEmail: string;
  tutorFirstName: string;
  tutorLastName: string;
  tutorFunction: string;
  name: string;
  phone: string;
  adress: string;
  cp: string;
  city: string;
}

const CompanySchema: Schema = new Schema({
  tutorEmail: { type: String, required: true },
  tutorFirstName: { type: String, required: true },
  tutorLastName: { type: String, required: true },
  tutorFunction: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  adress: { type: String, required: true },
  cp: { type: String, required: true },
  city: { type: String, required: true },
});

export const CompanyModel: Model<ICompany> = model('company', CompanySchema);