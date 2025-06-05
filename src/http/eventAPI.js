// LECTURE EVENT

import { $authHost } from ".";

export const createLectureEvent = async (lectureEvent) => {
  const {data} = await $authHost.post('lecture-events', lectureEvent);
  return data;
}
export const fetchLectureEvents = async () => {
  const {data} = await $authHost.get('lecture-events');
  return data;
}
export const fetchLectureEventById = async (id) => {
  const {data} = await $authHost.get(`lecture-events/${id}`);
  return data;
}
export const fetchLectureEventsByGroup = async (id) => {
  const {data} = await $authHost.get(`lecture-events/group/${id}`);
  return data;
}
export const fetchLectureEventsByTeacher = async (id) => {
  const {data} = await $authHost.get(`lecture-events/teacher/${id}`);
  return data;
}
export const updateLectureEventStatus = async (id, status) => {
  const {data} = await $authHost.patch(`lecture-events/${id}/status`, {status});
  return data;
}
export const deleteLectureEvent = async (id) => {
  const {data} = await $authHost.delete(`lecture-events/${id}`);
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
export const fetchDrivingEventById = async (id) => {
  const {data} = await $authHost.get(`driving-events/${id}`);
  return data;
}
export const fetchDrivingEventsByStudent = async (id) => {
  const {data} = await $authHost.get(`driving-events/student/${id}`);
  return data;
}
export const fetchDrivingEventsByInstructor = async (id) => {
  const {data} = await $authHost.get(`driving-events/instructor/${id}`);
  return data;
}
export const updateDrivingEventStatus = async (id, status) => {
  const {data} = await $authHost.patch(`driving-events/${id}/status`, {status});
  return data;
}
export const deleteDrivingEvent = async (id) => {
  const {data} = await $authHost.delete(`driving-events/${id}`);
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
export const fetchTestEventById = async (id) => {
  const {data} = await $authHost.get(`test-events/${id}`);
  return data;
}
export const fetchTestEventsByStudent = async (id) => {
  const {data} = await $authHost.get(`test-events/student/${id}`);
  return data;
}
export const fetchTestEventsByTeacher = async (id) => {
  const {data} = await $authHost.get(`test-events/teacher/${id}`);
  return data;
}
export const updateTestEventStatus = async (id, status) => {
  const {data} = await $authHost.patch(`test-events/${id}/status`, {status});
  return data;
}
export const deleteTestEvents = async (id) => {
  const {data} = await $authHost.delete(`test-events/${id}`);
  return data;
}

// STUDENT LECTURES

export const createStudentLecture = async (studentLecture) => {
  const {data} = await $authHost.post('student-lectures', studentLecture);
  return data;
}
export const fetchStudentLectures = async () => {
  const {data} = await $authHost.get('student-lectures');
  return data;
}
export const fetchStudentLectureByLectureId = async (id) => {
  const {data} = await $authHost.get(`student-lectures/lecture/${id}`);
  return data;
}
export const fetchStudentLectureByStudentId = async (id) => {
  const {data} = await $authHost.get(`student-lectures/student/${id}`);
  return data;
}
export const deleteStudentLecture = async (id) => {
  const {data} = await $authHost.delete(`student-lectures/${id}`);
  return data;
}