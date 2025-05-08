import { makeAutoObservable } from 'mobx';

export default class UserStore{
  constructor(){
    this._isAuth = localStorage.getItem('token') || false

    this._user = {}

    this._teachers = []

    this._instructors = []

    this._students = []

    this._users = []

    makeAutoObservable(this);
  }

  setIsAuth(bool){
    this._isAuth = bool;
  }
  
  setUser(user){
    this._user = user;
  }
  
  setTeachers(teachers){
    this._teachers = teachers;
  }
  
  setInstructors(instructors){
    this._instructors = instructors;
  }
  
  setStudents(students){
    this._students = students;
  }
  
  setUsers(users){
    this._users = users;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get teachers() {
    return this._teachers;
  }

  get instructors() {
    return this._instructors;
  }

  get students() {
    return this._students;
  }

  get users() {
    return this._users;
  }
}