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
export const updateUser = async (id, user) => {
  const {data} = await $authHost.put('users/'+id, user);
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
export const fetchUserByIdNumber = async (idNumber) => {
  const {data} = await $authHost.get(`users/${idNumber}`);
  return data;
}
export const deleteUser = async (id) => {
  const {data} = await $authHost.delete(`users/${id}`);
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
export const fetchStudentById = async (id) => {
  const {data} = await $authHost.get(`students/${id}`);
  return data;
}
export const fetchStudentsByInstructor = async (instructorId) => {
  const {data} = await $authHost.get(`students/instructor/${instructorId}`);
  return data;
}
export const fetchStudentsByTeacher = async (teacherId) => {
  const {data} = await $authHost.get(`students/teacher/${teacherId}`);
  return data;
}
export const setStudentGroup = async (studentId, groupId) => {
  const {data} = await $authHost.patch(`students/${studentId}/group/${groupId}`);
  return data;
}
export const deleteStudent = async (id) => {
  const {data} = await $authHost.delete(`students/${id}`);
  return data;
}
export const updateStudentStatus = async (studentId, status) => {
  const {data} = await $authHost.patch(`students/${studentId}/status`, {status});
  return data;
}
export const updateStudentInstructor = async (studentId, instructorId) => {
  const {data} = await $authHost.patch(`students/${studentId}/instructor/${instructorId}`)
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
export const fetchTeacherById = async (id) => {
  const {data} = await $authHost.get(`teachers/${id}`);
  return data;
}
export const deleteTeacher = async (id) => {
  const {data} = await $authHost.delete(`teachers/${id}`);
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
export const fetchInstructorById = async (id) => {
  const {data} = await $authHost.get(`instructors/${id}`);
  return data;
}
export const deleteInstructor = async (id) => {
  const {data} = await $authHost.delete(`instructors/${id}`);
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
export const fetchGroupById = async (id) => {
  const {data} = await $authHost.get('groups/' + id);
  return data;
}
export const fetchGroupsByTeacher = async (id) => {
  const {data} = await $authHost.get('groups/teacher/' + id);
  return data;
}
export const updateGroupTeacher = async (groupId, teacherId) => {
  const {data} = await $authHost.patch(`groups/${groupId}/teacher/${teacherId}`);
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
export const updateTransportInstructor = async (transportId, instructorId) => {
  const {data} = await $authHost.patch(`transports/${transportId}/instructor/${instructorId}`)
  return data;
}
export const deleteTransport = async (id) => {
  const {data} = await $authHost.delete(`transports/${id}`);
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
export const deleteTest = async (id) => {
  const {data} = await $authHost.delete(`tests/${id}`);
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
export const deleteDrivingPlace = async (id) => {
  const {data} = await $authHost.delete(`driving-places/${id}`);
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
export const deleteCategory = async (id) => {
  const {data} = await $authHost.delete(`categories/${id}`);
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
export const deleteInstructorCategory = async (id) => {
  const {data} = await $authHost.delete(`instructor-categories/${id}`);
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
export const deleteQual = async (id) => {
  const {data} = await $authHost.delete(`quals/${id}`);
  return data;
}

// SCHEDULE GROUP

export const createScheduleGroup = async (scheduleGroup) => {
  const {data} = await $authHost.post('schedule-groups', scheduleGroup);
  return data;
}
export const fetchScheduleGroups = async () => {
  const {data} = await $authHost.get('schedule-groups');
  return data;
}
export const deleteScheduleGroup = async (id) => {
  const {data} = await $authHost.delete(`schedule-groups/${id}`);
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
export const deleteTeacherQual = async (id) => {
  const {data} = await $authHost.delete(`teacher-quals/${id}`);
  return data;
}

// MESSAGES

export const createMessage = async (message) => {
  const {data} = await $authHost.post('messages', message);
  return data;
}
export const fetchMessages = async () => {
  const {data} = await $authHost.get('messages');
  return data;
}
export const deleteMessage = async (id) => {
  const {data} = await $authHost.delete(`messages/${id}`);
  return data;
}

