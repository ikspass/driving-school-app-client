import { makeAutoObservable } from 'mobx';

export default class EventStore{
  constructor(){
    this._selectedDate = null

    this._lectureEvents = [
      // { id: 1, date: '2025-05-01', status: '', time: '15:00', teacherId: '1', groupId: '1', topicId: ''},
      // { id: 2, date: '2025-05-01', status: '', time: '18:00', teacherId: '1', groupId: '1', topicId: ''},
      // { id: 3, date: '2025-05-03', status: '', time: '12:00', teacherId: '2', groupId: '2', topicId: ''},
      // { id: 4, date: '2025-05-03', status: '', time: '15:00', teacherId: '2', groupId: '2', topicId: ''},
    ]

    this._drivingEvents = [
      // { id: 1, date: '2025-05-03', status: '', time: '9:00', instructorId: '1', studentId: '1', placeId: '1'},
      // { id: 2, date: '2025-05-03', status: '', time: '10:30', instructorId: '2', studentId: '2', placeId: '1'},
      // { id: 3, date: '2025-05-04', status: '', time: '12:00', instructorId: '1', studentId: '3', placeId: '1'},
      // { id: 4, date: '2025-05-05', status: '', time: '13:30', instructorId: '1', studentId: '4', placeId: '1'},
    ]

    this._testEvents = [
      // { id: 1, date: '2025-05-07', status: '', time: '18:00', groupId: '1', testId: ''},
    ]

    this._studentId = null

    this._teacherId = null

    this._instructorId = null

    this._groupId = null

    makeAutoObservable(this);
  }
  
  setStudentId(id){
    this._studentId = id;
  }

  setTeacherId(id){
    this._teacherId = id;
  }

  setInstructorId(id){
    this._instructorId = id;
  }

  setGroupId(id){
    this._groupId = id;
  }

  setSelectedDate(date){
    this._selectedDate = date;
  }
  
  setLectureEvents(lectureEvents){
    this._lectureEvents = lectureEvents;
  }

  setDrivingEvents(drivingEvents){
    this._drivingEvents = drivingEvents;
  }
  
  setTestEvents(testEvents){
    this._testEvents = testEvents;
  }

  get selectedDate() {
    return this._selectedDate;
  }

  get lectureEvents() {
    return this._lectureEvents;
  }

  get drivingEvents() {
    return this._drivingEvents;
  }

  get testEvents() {
    return this._testEvents;
  }

  get events() {
    return [
      ...this._lectureEvents.map(event => ({ ...event, type: 'Лекция' })),
      ...this._drivingEvents.map(event => ({ ...event, type: 'Вождение' })),
      ...this._testEvents.map(event => ({ ...event, type: 'Зачёт' })),
    ];
  }

  get studentEvents() {
    const eventsWithType = [
      ...this._lectureEvents.filter(event => event.groupId === this._groupId),
      ...this._drivingEvents.filter(event => event.studentId === this._studentId),
      ...this._testEvents.filter(event => event.groupId === this._groupId),
    ];
  
    return eventsWithType.length > 0 ? eventsWithType : [];
  }

  get teacherEvents() {
    const eventsWithType = [
      ...this._lectureEvents.filter(event => this._groupId.includes(event.groupId)),
      ...this._testEvents.filter(event => this._groupId.includes(event.groupId)),
    ];
  
    return eventsWithType.length > 0 ? eventsWithType : [];
  }

  get instructorEvents() {
    const eventsWithType = [
      ...this._drivingEvents.filter(event => event.instructorId === this._instructorId),
    ];
  
    return eventsWithType.length > 0 ? eventsWithType : [];
  }

  get eventsByDate() {
    const eventsWithType = [
      ...this._lectureEvents.map(event => ({ ...event, type: 'Лекция' })),
      ...this._drivingEvents.map(event => ({ ...event, type: 'Вождение' })),
      ...this._testEvents.map(event => ({ ...event, type: 'Зачёт' })),
    ];
  
    const result = eventsWithType.filter(event => event.date === this._selectedDate);
    return result.length > 0 ? result : [];
  }
}