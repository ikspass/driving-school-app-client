import { makeAutoObservable } from 'mobx';

export default class RouteStore{
  constructor(){
    this._initialRoute = '';

    makeAutoObservable(this);
  }
  
  setInitialRoute(route){
    this._initialRoute = route;
  }

  get initialRoute() {
    return this._initialRoute;
  }
}