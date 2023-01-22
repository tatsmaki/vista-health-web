import {
  BoxGeometry,
  CanvasTexture,
  ConeGeometry,
  Group,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  WireframeGeometry,
} from "three";
import { Devices } from "../constants/devices.constants";
import { IUser } from "../interfaces/user.interface";

export class User {
  private group = new Group();
  private offsetY = 0;

  constructor(private readonly user: IUser) {
    if (user.platform === Devices.VR) {
      this.offsetY = 0;
    } else {
      this.offsetY = 1.7;
    }
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
    context.fillText(text, 30, 20);
    texture.needsUpdate = true;
    const geometry = new PlaneGeometry(1, 0.5);
    const material = new MeshStandardMaterial({
      map: texture,
      transparent: true,
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(0, this.offsetY + 0.4, -0.25);
    this.group.add(mesh);
    return this;
  }

  withCamera() {
    const geometry = new ConeGeometry(5, 10, 4);
    const wireframe = new WireframeGeometry(geometry);
    const line = new LineSegments(wireframe);
    line.rotation.z = Math.PI / 2;
    line.rotation.y = Math.PI / 2;
    line.translateY(-5);
    this.group.add(line);
    return this;
  }

  build() {
    const geometry = new BoxGeometry(0.5, 0.5, 0.5);
    const material = new MeshStandardMaterial({ color: 0xa292aa });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(0, this.offsetY, 0);
    this.group.add(mesh);
    return this.group;
  }
}
