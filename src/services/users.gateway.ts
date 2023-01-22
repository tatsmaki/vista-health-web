import { io } from "socket.io-client";
import { SocketEvents } from "../constants/socket-events.constant";
import { IUser } from "../interfaces/user.interface";

export class UsersGateway {
  readonly socket = io(process.env.APP_API_URL + "/users");

  createUser(user: IUser) {
    this.socket.emit(SocketEvents.UserCreate, user);
  }

  onUserCreated(callback: any) {
    this.socket.on(SocketEvents.UserCreated, callback);
  }

  onUserRemoved(callback: any) {
    this.socket.on(SocketEvents.UserRemoved, callback);
  }

  moveUser(user: IUser, p: any, r: any) {
    this.socket.emit(SocketEvents.UserMove, { user, p, r });
  }

  onUserMoved(callback: any) {
    this.socket.on(SocketEvents.UserMoved, callback);
  }
}

export const usersGateway = new UsersGateway();
