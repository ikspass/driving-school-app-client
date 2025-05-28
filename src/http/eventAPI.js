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
export const deleteTestEvents = async (id) => {
  const {data} = await $authHost.delete(`test-events/${id}`);
  return data;
}