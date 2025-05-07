import { makeAutoObservable } from 'mobx';

export default class GroupStore{
  constructor(){
    this._categories = [
      {id: 1, value: 'A'},
      {id: 2, value: 'B'},
      {id: 3, value: 'C'},
      {id: 4, value: 'CE'},
    ]

    this._teachers = [
      {id: 1, fullName: 'Кузьмина Марина Алексеевна', phoneNumber: '+375295678345', dateOfBirth: '2000-08-16', dateOfEmployment: '2025-02-04', status: 'Активен'},
      {id: 2, fullName: 'Петров Иван Геннадьевич', phoneNumber: '+375291235637', dateOfBirth: '1998-03-10', dateOfEmployment: '2025-02-02', status: 'В отпуске'},
      {id: 3, fullName: 'Персик Антонина Петровна', phoneNumber: '+375293421234', dateOfBirth: '2000-08-02', dateOfEmployment: '2025-02-03', status: 'Активен'},
    ]

    this._groups = [
      {id: 1, name: '15A', category: 'A', teacher: 'Кузьмина Марина Алексеевна', dateOfStart: '2025-04-03', status: 'Активна' },
      {id: 2, name: '15B', category: 'B', teacher: 'Персик Антонина Петровна', dateOfStart: '2025-04-01', status: 'Активна' },
    ]

    this._selectedCategory = null

    this._selectedTeacher = null

    makeAutoObservable(this);
  }

  setCategories(categories){
    this._categories = categories;
  }

  setTeachers(teachers){
    this._teachers = teachers;
  }
  
  setGroups(groups){
    this._groups = groups;
  }
  
  setSelectedCategory(category){
    this._selectedCategory = category;
  }
  
  setSelectedTeacher(teacher){
    this._selectedTeacher = teacher;
  }

  get categories() {
    return this._categories;
  }

  get teachers() {
    return this._teachers;
  }

  get groups() {
    return this._groups;
  }

  get selectedCategory() {
    return this._selectedCategory;
  }

  get selectedTeacher() {
    return this._selectedTeacher;
  }
}