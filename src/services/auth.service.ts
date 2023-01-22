import { makeObservable, observable, action } from "mobx";
import { IUser } from "../interfaces/user.interface";

export class AuthService {
  user$: IUser | null = null;

  constructor() {
    makeObservable(this, {
      user$: observable,
      login: action,
      logout: action,
    });
  }

  login(user: IUser) {
    this.user$ = user;
  }

  logout() {
    this.user$ = null;
  }
}

export const authService = new AuthService();
