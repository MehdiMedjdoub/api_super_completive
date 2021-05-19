import { model, Schema, Model, Document } from 'mongoose';

interface ISalle extends Document {
  name: string;
  capacity: string;
}

const SalleSchema: Schema = new Schema({
  name: { type: String, required: true },
  capacity: { type: String, required: true },
});

export const SalleModel: Model<ISalle> = model('salle', SalleSchema);