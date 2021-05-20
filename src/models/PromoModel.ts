import { ObjectId } from 'bson';
import { model, Schema, Model, Document } from 'mongoose';

interface IPromo extends Document {
  name: string;
  student: ObjectId;
}

const PromoSchema: Schema = new Schema({
  name: { type: String, required: true },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'student'
}
});

export const PromoModel: Model<IPromo> = model('promo', PromoSchema);