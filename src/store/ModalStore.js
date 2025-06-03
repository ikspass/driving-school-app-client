import { makeAutoObservable } from 'mobx';

export default class ModalStore{
  constructor(){
    this._isOpen = false;

    makeAutoObservable(this);
  }
  
  setIsOpen(bool){
    this._isOpen = bool;
  }

  get isOpen() {
    return this._isOpen;
  }
}