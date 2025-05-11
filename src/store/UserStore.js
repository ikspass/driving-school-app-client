import { makeAutoObservable } from 'mobx';

export default class UserStore{
  constructor(){
    this._isAuth = localStorage.getItem('token') || false

    this._user = {}

    // this._teachers = []

    // this._instructors = []

    // this._students = []

    this._users = []

    makeAutoObservable(this);
  }

  setIsAuth(bool){
    this._isAuth = bool;
  }
  
  setUser(user){
    this._user = user;
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
    const result = this._users.filter(user => user.role && user.role.value === 'teacher');
    return result.length > 0 ? result : [];
  }

  get instructors() {
    const result = this._users.filter(user => user.role && user.role.value === 'instructor');
    return result.length > 0 ? result : [];
  }

  get students() {
    const result = this._users.filter(user => user.role.value === 'student');
    return result.length > 0 ? result : [];
  }

  get users() {
    return this._users;
  }
}