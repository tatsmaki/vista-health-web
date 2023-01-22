import { makeObservable, observable, action } from "mobx";
import { Object3D } from "three";
import { scene } from "../3d/scene";
import { User } from "../3d/user";
import { IUser } from "../interfaces/user.interface";
import { usersGateway, UsersGateway } from "./users.gateway";

const url = process.env.APP_API_URL;

export class UsersService {
  users$: IUser[] = [];
  models: Record<string, Object3D> = {};

  constructor(private readonly usersGateway: UsersGateway) {
    makeObservable(this, {
      users$: observable,
      setUsers: action,
      onUserCreated: action,
      onUserRemoved: action,
    });
    this.usersGateway.onUserCreated(this.onUserCreated.bind(this));
    this.usersGateway.onUserRemoved(this.onUserRemoved.bind(this));
    this.usersGateway.onUserMoved(this.onUserMoved.bind(this));
  }

  setUsers(users: IUser[]) {
    this.users$ = users;
  }

  async getUsers() {
    const response = await fetch(`${url}/users`, {
      method: "GET",
    });
    const users = await response.json();
    this.setUsers(users);
    return users;
  }

  async createUser(full_name: string, platform: string) {
    const response = await fetch(`${url}/user`, {
      method: "POST",
      body: JSON.stringify({ full_name, platform }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return Promise.reject();
    }
    const user = await response.json();
    this.setUsers([...this.users$, user]);
    return user;
  }

  onUserCreated(user: IUser) {
    this.users$.push(user);
    const model = new User().withName(user).build();
    model.name = String(user.id);
    this.models[user.id] = model;
    scene.add(model);
  }

  onUserRemoved({ id }: IUser) {
    this.users$ = this.users$.filter((user) => user.id !== id);
    const model = scene.getObjectByName(String(id))!;
    delete this.models[id];
    scene.remove(model);
  }

  onUserMoved({ user, p, r }: any) {
    const model = scene.getObjectByName(String(user.id))!;
    model.position.copy(p);
    model.rotation.copy(r);
  }
}

export const usersService = new UsersService(usersGateway);
