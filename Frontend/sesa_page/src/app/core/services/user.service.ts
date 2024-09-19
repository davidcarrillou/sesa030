import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private storageKey = 'userData';

  constructor() { }

  setUserData(data: any) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getUserData() {
    const data = sessionStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  clearUserData() {
    sessionStorage.removeItem(this.storageKey);
  }
}
