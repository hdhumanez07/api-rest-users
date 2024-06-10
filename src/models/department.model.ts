import { Schema, model, Model } from 'mongoose';
import { IDepartment } from '../interfaces/department.interface';

const DepartmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true },
  },
  { versionKey: false },
);

const DepartmentModel: Model<IDepartment> = model(
  'departments',
  DepartmentSchema,
);
export default DepartmentModel;
