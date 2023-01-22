import { Euler } from "three";
import { KeyboardController } from "../controllers/keyboard.controller";
import { head } from "../3d/head";

export const moveFrame = (keyboardController: KeyboardController) => {
  const direction = keyboardController.direction;
  const euler = new Euler();
  euler.setFromQuaternion(head.quaternion, "YXZ");
  euler.x = 0;
  direction.applyEuler(euler);
  head.position.addScaledVector(direction, 0.1);
};
