import { $authHost, $host } from ".";
import { jwtDecode } from 'jwt-decode'

export const adminLogin = async (password) => {
  const {data} = await $host.post('auth/admin-login', {password});
  localStorage.setItem('token', data.token);  
  return jwtDecode(data.token);
}

export const createUser = async (user) => {
  const {data} = await $authHost.post('users', user);
  return data;
}

export const fetchUsers = async () => {
  const {data} = await $authHost.get('users');
  return data;
}

export const fetchUserById = async (id) => {
  const {data} = await $authHost.get(`users/${id}`);
  return data;
}

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

export const createTransport = async (transport) => {
  const {data} = await $authHost.post('transports', transport);
  return data;
}

export const fetchTransports = async () => {
  const {data} = await $authHost.get('transports');
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

export const createInstructorCategories = async (category) => {
  const {data} = await $authHost.post('instructor-categories', category);
  return data;
}

export const fetchInstructorCategories = async () => {
  const {data} = await $authHost.get('instructor-categories');
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

export const createScheduleGroups = async (scheduleGroup) => {
  const {data} = await $authHost.post('schedule-groups', scheduleGroup);
  return data;
}

export const fetchScheduleGroups = async () => {
  const {data} = await $authHost.get('schedule-groups');
  return data;
}

export const createTeacherQual = async (qual) => {
  const {data} = await $authHost.post('teacher-quals', qual);
  return data;
}

export const fetchTeacherQuals = async () => {
  const {data} = await $authHost.get('teacher-quals');
  return data;
}

export const fetchLectureEvents = async () => {
  const {data} = await $authHost.get('lecture-events');
  return data;
}

export const fetchDrivingEvents = async () => {
  const {data} = await $authHost.get('driving-events');
  return data;
}

export const fetchTestEvents = async () => {
  const {data} = await $authHost.get('test-events');
  return data;
}


