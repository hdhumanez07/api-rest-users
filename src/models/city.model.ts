import { Schema, model, Model } from 'mongoose';
import { ICity } from '../interfaces/city.interface';

const CitySchema = new Schema<ICity>(
  {
    name: { type: String, required: true },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'departments',
      required: true,
    },
  },
  { versionKey: false },
);

const CityModel: Model<ICity> = model('cities', CitySchema);
export default CityModel;
