import { Euler } from "three";
import { KeyboardController } from "../controllers/keyboard.controller";
import { camera } from "../3d/camera";

export const moveFrame = (keyboardController: KeyboardController) => {
  const direction = keyboardController.direction;
  const euler = new Euler();
  euler.setFromQuaternion(camera.quaternion, "YXZ");
  euler.x = 0;
  direction.applyEuler(euler);
  camera.position.addScaledVector(direction, 0.1);
};
