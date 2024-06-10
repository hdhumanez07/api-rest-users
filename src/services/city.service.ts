import CityModel from '../models/city.model';

const getCities = async (idDepartment?: string) => {
  if (idDepartment) {
    const city = await CityModel.find({ department: idDepartment });
    return city;
  }
  const cities = await CityModel.find();
  return cities;
};

export { getCities };
