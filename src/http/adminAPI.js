import { $authHost, $host } from ".";
import { jwtDecode } from 'jwt-decode'

export const adminLogin = async (password) => {
  const {data} = await $host.post('auth/admin-login', {password});
  localStorage.setItem('token', data.token);  
  return jwtDecode(data.token);
}

// USER

export const createUser = async (user) => {
  const {data} = await $authHost.post('users', user);
  return data;
}
export const fetchUsers = async () => {
  const {data} = await $authHost.get('users');
  return data;
}
export const fetchOneUser = async (id) => {
  const {data} = await $authHost.get(`users/${id}`);
  return data;
}

// STUDENT

export const createStudent = async (student) => {
  const {data} = await $authHost.post('students', student);
  return data;
}
export const fetchStudents = async () => {
  const {data} = await $authHost.get('students');
  return data;
}

// TEACHER

export const createTeacher = async (teacher) => {
  const {data} = await $authHost.post('teachers', teacher);
  return data;
}
export const fetchTeachers = async () => {
  const {data} = await $authHost.get('teachers');
  return data;
}

// INSTRUCTOR

export const createInstructor = async (instructor) => {
  const {data} = await $authHost.post('instructors', instructor);
  return data;
}
export const fetchInstructors = async () => {
  const {data} = await $authHost.get('instructors');
  return data;
}

// GROUP

export const createGroup = async (group) => {
  const {data} = await $authHost.post('groups', group);
  return data;
}
export const fetchGroups = async () => {
  const {data} = await $authHost.get('groups');
  return data;
}
export const fetchOneGroup = async (id) => {
  const {data} = await $authHost.get('groups/' + id);
  return data;
}
export const deleteGroup = async (id) => {
  const {data} = await $authHost.delete('groups/' + id);
  return data;
}

// TRANSPORT

export const createTransport = async (transport) => {
  const {data} = await $authHost.post('transports', transport);
  return data;
}
export const fetchTransports = async () => {
  const {data} = await $authHost.get('transports');
  return data;
}

// TEST

export const createTest = async (test) => {
  const {data} = await $authHost.post('tests', test);
  return data;
}
export const fetchTests = async () => {
  const {data} = await $authHost.get('tests');
  return data;
}

// DRIVING PLACE

export const createDrivingPlace = async (drivingPlace) => {
  const {data} = await $authHost.post('driving-places', drivingPlace);
  return data;
}
export const fetchDrivingPlaces = async () => {
  const {data} = await $authHost.get('driving-places');
  return data;
}

// CATEGORY

export const createCategory = async (category) => {
  const {data} = await $authHost.post('categories', category);
  return data;
}
export const fetchCategories = async () => {
  const {data} = await $authHost.get('categories');
  return data;
}

// INSTRUCTOR CATEGORY

export const createInstructorCategories = async (category) => {
  const {data} = await $authHost.post('instructor-categories', category);
  return data;
}
export const fetchInstructorCategories = async () => {
  const {data} = await $authHost.get('instructor-categories');
  return data;
}

// QUAL

export const createQual = async (qual) => {
  const {data} = await $authHost.post('quals', qual);
  return data;
}
export const fetchQuals = async () => {
  const {data} = await $authHost.get('quals');
  return data;
}

// SCHEDULE GROUP

export const createScheduleGroups = async (scheduleGroup) => {
  const {data} = await $authHost.post('schedule-groups', scheduleGroup);
  return data;
}
export const fetchScheduleGroups = async () => {
  const {data} = await $authHost.get('schedule-groups');
  return data;
}

// TEACHER QUAL

export const createTeacherQual = async (qual) => {
  const {data} = await $authHost.post('teacher-quals', qual);
  return data;
}
export const fetchTeacherQuals = async () => {
  const {data} = await $authHost.get('teacher-quals');
  return data;
}

// LECTURE EVENT

export const createLectureEvent = async (lectureEvent) => {
  const {data} = await $authHost.post('lecture-events', lectureEvent);
  return data;
}
export const fetchLectureEvents = async () => {
  const {data} = await $authHost.get('lecture-events');
  return data;
}

// DRIVING EVENT

export const createDrivingEvent = async (drivingEvent) => {
  const {data} = await $authHost.post('driving-events', drivingEvent);
  return data;
}
export const fetchDrivingEvents = async () => {
  const {data} = await $authHost.get('driving-events');
  return data;
}

// TEST EVENT

export const createTestEvent = async (testEvent) => {
  const {data} = await $authHost.post('test-events', testEvent);
  return data;
}
export const fetchTestEvents = async () => {
  const {data} = await $authHost.get('test-events');
  return data;
}