import { makeAutoObservable } from 'mobx';

export default class EventStore{
  constructor(){
    this._selectedDate = null

    this._lectureEvents = [
      { date: '2025-05-01', time: '15:00', teacherId: '1', groupId: '1', topicId: ''},
      { date: '2025-05-01', time: '18:00', teacherId: '1', groupId: '1', topicId: ''},
      { date: '2025-05-03', time: '12:00', teacherId: '2', groupId: '2', topicId: ''},
      { date: '2025-05-03', time: '15:00', teacherId: '2', groupId: '2', topicId: ''},
    ]

    this._drivingEvents = [
      { date: '2025-05-03', time: '9:00', instructorId: '1', studentId: '1', placeId: '1'},
      { date: '2025-05-03', time: '10:30', instructorId: '2', studentId: '2', placeId: '1'},
      { date: '2025-05-04', time: '12:00', instructorId: '1', studentId: '3', placeId: '1'},
      { date: '2025-05-05', time: '13:30', instructorId: '1', studentId: '4', placeId: '1'},
    ]

    this._testEvents = [
      { date: '2025-05-07', time: '18:00', groupId: '1', testId: ''},
    ]

    makeAutoObservable(this);
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
    return [...this._lectureEvents, ...this._drivingEvents, ...this._testEvents];
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