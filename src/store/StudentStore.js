import { makeAutoObservable } from 'mobx';

export default class StudentStore{
  constructor(){
    this._studentTests = []

    this._studentLectures = []

    this._studentRetakes = []

    makeAutoObservable(this);
  }
  
  setStudentTests(studentTests){
    this._studentTests = studentTests;
  }
  
  setStudentTests(studentLectures){
    this._studentLectures = studentLectures;
  }
  
  setStudentTests(studentRatakes){
    this._studentRetakes = studentRatakes;
  }

  get studentTests() {
    return this._studentTests;
  }

  get studentLectures() {
    return this._studentLectures;
  }

  get studentRetakes() {
    return this._studentRetakes;
  }
}