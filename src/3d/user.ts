import {
  BoxGeometry,
  CanvasTexture,
  DoubleSide,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
} from "three";
import { IUser } from "../interfaces/user.interface";

export class User {
  private group = new Group();

  withName({ full_name, platform }: IUser) {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 100;
    const context = canvas.getContext("2d")!;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "16px arial";
    context.fillStyle = "#000000";
    const texture = new CanvasTexture(context.canvas);
    const text = `${full_name} (${platform})`;
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
    mesh.position.set(0, 2, 0);
    this.group.add(mesh);
    return this;
  }

  build() {
    const geometry = new BoxGeometry(0.5, 0.5, 0.5);
    const material = new MeshStandardMaterial({ color: 0xa292aa });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(0, 1.5, 0);
    this.group.add(mesh);
    return this.group;
  }
}
