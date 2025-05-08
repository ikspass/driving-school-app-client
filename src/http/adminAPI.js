import { $authHost, $host } from ".";
import { jwtDecode } from 'jwt-decode'

export const createUser = async (user) => {
  const {data} = await $authHost.post('users', user);
  return data;
}

export const fetchUsers = async () => {
  const {data} = await $authHost.get('users');
  return data;
}

// export const fetchUserByIdNumber = async (idNumber) => {
//   const {data} = await $authHost.get(`users/idNumber/${idNumber}`)
// }

export const createStudent = async (student) => {
  const {data} = await $authHost.post('students', student);
  return data;
}

export const fetchStudents = async () => {
  const {data} = await $authHost.get('students');
  return data;
}

export const createTeacher = async (teacher) => {
  const {data} = await $authHost.post('teachers', teacher);
  return data;
}

export const fetchTeachers = async () => {
  const {data} = await $authHost.get('teachers');
  return data;
}

export const createInstructor = async (instructor) => {
  const {data} = await $authHost.post('instructors', instructor);
  return data;
}

export const fetchInstructors = async () => {
  const {data} = await $authHost.get('instructors');
  return data;
}

export const createGroup = async (group) => {
  const {data} = await $authHost.post('groups', group);
  return data;
}

export const fetchGroups = async () => {
  const {data} = await $authHost.get('groups');
  return data;
}

export const createCar = async (car) => {
  const {data} = await $authHost.post('cars', car);
  return data;
}

export const fetchCars = async () => {
  const {data} = await $authHost.get('cars');
  return data;
}

export const createTest = async (test) => {
  const {data} = await $authHost.post('tests', test);
  return data;
}

export const fetchTests = async () => {
  const {data} = await $authHost.get('tests');
  return data;
}

export const createDrivingPlace = async (drivingPlace) => {
  const {data} = await $authHost.post('driving-places', drivingPlace);
  return data;
}

export const fetchDrivingPlaces = async () => {
  const {data} = await $authHost.get('driving-places');
  return data;
}

export const createCategory = async (category) => {
  const {data} = await $authHost.post('categories', category);
  return data;
}

export const fetchCategories = async () => {
  const {data} = await $authHost.get('categories');
  return data;
}

export const createQual = async (qual) => {
  const {data} = await $authHost.post('quals', qual);
  return data;
}

export const fetchQuals = async () => {
  const {data} = await $authHost.get('quals');
  return data;
}


