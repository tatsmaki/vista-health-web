import {
  BoxGeometry,
  CanvasTexture,
  DoubleSide,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  Vector3,
} from "three";
import { Devices } from "../constants/devices.constants";
import { IUser } from "../interfaces/user.interface";

export class User {
  private group = new Group();

  constructor(private readonly user: IUser) {
    const y = user.platform === Devices.VR ? 0 : 1.7;
    this.group.position.set(0, y, 0);
  }

  withName() {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 100;
    const context = canvas.getContext("2d")!;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "16px arial";
    context.fillStyle = "#000000";
    const texture = new CanvasTexture(context.canvas);
    const { full_name, platform } = this.user;
    const text = `${full_name} (${platform.toUpperCase()})`;
    context.clearRect(0, 0, 200, 100);
    context.fillText(text, 0, 20);
    texture.needsUpdate = true;
    const geometry = new PlaneGeometry(1, 0.5);
    const material = new MeshStandardMaterial({
      map: texture,
      transparent: true,
      side: DoubleSide,
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(0.25, 0.4, 0.25);
    this.group.add(mesh);
    return this;
  }

  build() {
    const geometry = new BoxGeometry(0.5, 0.5, 0.5);
    const material = new MeshStandardMaterial({ color: 0xa292aa });
    const mesh = new Mesh(geometry, material);
    this.group.add(mesh);
    return this.group;
  }
}
