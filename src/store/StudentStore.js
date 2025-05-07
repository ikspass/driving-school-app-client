import { makeAutoObservable } from 'mobx';

export default class StudentStore{
  constructor(){
    this._groups = [
      {id: 1, name: '15A'},
      {id: 2, name: '15B'},
    ]

    this._instructors = [
      {id: 1, name: 'Иванов И.И.'},
      {id: 2, name: 'Смирнов А.А.'},
    ]

    this._students = [
      {id: 0, userId: 0, fullName: 'Рычкова Полина Андреевна', dateOfBirth: '2005-09-18', phoneNumber: '+375256085506', status: 'Активен', instructor: 'Иванов И.И.', group: '16B'},
      {id: 1, userId: 1, fullName: 'Мелихов Даниил Олегович', dateOfBirth: '2005-06-08', phoneNumber: '+375255074405', status: 'Активен', instructor: 'Смирнов А.А.', group: '16B'},
    ]

    this._selectedGroup = null

    this._selectedInstructor = null

    makeAutoObservable(this);
  }

  setGroups(groups){
    this._groups = groups;
  }

  setInstructors(instructors){
    this._instructors = instructors;
  }
  
  setStudents(students){
    this._students = students;
  }
  
  setSelectedGroup(group){
    console.log(`Group selected: ${group}`); // Логируем выбранную группу
    this._selectedGroup = group;
  }
  
  setSelectedInstructor(instructor){
    console.log(`Instructor selected: ${instructor}`); // Логируем выбранного инструктора
    this._selectedInstructor = instructor;
  }

  get groups() {
    return this._groups;
  }

  get instructors() {
    return this._instructors;
  }

  get students() {
    return this._students;
  }

  get selectedGroup() {
    return this._selectedGroup;
  }

  get selectedInstructor() {
    return this._selectedInstructor;
  }
}