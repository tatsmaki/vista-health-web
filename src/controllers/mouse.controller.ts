import { Euler } from "three";
import { camera } from "../3d/camera";

export class MouseController {
  private euler = new Euler(0, 0, 0, "YXZ");

  constructor() {
    document.onmousemove = this.handleMouseMove.bind(this);
  }

  private handleMouseMove(event: MouseEvent) {
    if (document.pointerLockElement) {
      const { movementX, movementY } = event;
      this.euler.setFromQuaternion(camera.quaternion);
      this.euler.y -= movementX * 0.004;
      this.euler.x -= movementY * 0.004;
      this.euler.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, this.euler.x)
      );
      camera.quaternion.setFromEuler(this.euler);
    }
  }
}
