import { makeAutoObservable } from 'mobx';

export default class SchoolStore{
  constructor(){
    this._tests = []
    
    this._materials = []

    this._topics = []

    this._cars = []

    this._drivingPlaces = []

    this._quals = []

    this._roles = []

    this._categories = []

    makeAutoObservable(this);
  }
  
  setTests(tests){
    this._tests = tests;
  }
  
  setMaterials(materials){
    this._materials = materials;
  }
  
  setTopics(topics){
    this._topics = topics;
  }
  
  setCars(cars){
    this._cars = cars;
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

  get tests() {
    return this._tests;
  }

  get materials() {
    return this._materials;
  }

  get topics() {
    return this._topics;
  }

  get cars() {
    return this._cars;
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
}