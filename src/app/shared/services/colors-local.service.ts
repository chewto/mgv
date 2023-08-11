import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsLocalService {

  private localStorage = window.localStorage;

  constructor() { }

  public retriveLocal(key:string): string | null{
    const retriveLocalData = this.localStorage.getItem(key);
    return retriveLocalData ? retriveLocalData : null;
  }
}
