import DepartmentModel from '../models/department.model';

const getDepartments = async () => {
  const departments = await DepartmentModel.find();
  return departments;
};

export { getDepartments };
