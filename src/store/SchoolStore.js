import { makeAutoObservable } from 'mobx';

export default class SchoolStore{
  constructor(){
    this._tests = []
    
    this._chapters = []

    this._topics = []

    this._transports = []

    this._drivingPlaces = []

    this._quals = []

    this._roles = []

    this._categories = []

    this._scheduleGroups = []

    makeAutoObservable(this);
  }
  
  setTests(tests){
    this._tests = tests;
  }
  
  setMaterials(chapters){
    this._chapters = chapters;
  }
  
  setTopics(topics){
    this._topics = topics;
  }
  
  setTransports(transports){
    this._transports = transports;
  }
  
  setDrivingPlaces(drivingPlaces){
    this._drivingPlaces = drivingPlaces;
  }
  
  setQuals(quals){
    this._quals = quals;
  }
  
  setRoles(roles){
    this._roles = roles;
  }
  
  setCategories(categories){
    this._categories = categories;
  }
  
  setScheduleGroups(scheduleGroups){
    this._scheduleGroups = scheduleGroups;
  }

  get tests() {
    return this._tests;
  }

  get chapters() {
    return this._chapters;
  }

  get topics() {
    return this._topics;
  }

  get transports() {
    return this._transports;
  }

  get drivingPlaces() {
    return this._drivingPlaces;
  }

  get quals() {
    return this._quals;
  }

  get roles() {
    return this._roles;
  }

  get categories() {
    return this._categories;
  }

  get scheduleGroups() {
    return this._scheduleGroups;
  }
}