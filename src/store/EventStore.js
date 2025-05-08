import { makeAutoObservable } from 'mobx';

export default class EventStore{
  constructor(){
    this._lectureEvents = []

    this._drivingEvents = []

    this._testEvents = []

    makeAutoObservable(this);
  }
  
  setGroups(lectureEvents){
    this._lectureEvents = lectureEvents;
  }
  
  setGroups(drivingEvents){
    this._drivingEvents = drivingEvents;
  }
  
  setGroups(testEvents){
    this._testEvents = testEvents;
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
}