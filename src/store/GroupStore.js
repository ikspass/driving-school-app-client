import { makeAutoObservable } from 'mobx';

export default class GroupStore{
  constructor(){
    this._group = {}

    this._groups = []

    makeAutoObservable(this);
  }
  
  setGroup(group){
    this._group = group;
  }

  setGroups(groups){
    this._groups = groups;
  }

  get group() {
    return this._group;
  }

  get groups() {
    return this._groups;
  }
}