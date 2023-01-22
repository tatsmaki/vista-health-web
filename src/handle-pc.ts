import { renderer } from "./renderer";
import { scene } from "./3d/scene";
import { camera } from "./3d/head";
import { KeyboardController } from "./controllers/keyboard.controller";
import { LockController } from "./controllers/lock.controller";
import { MouseController } from "./controllers/mouse.controller";
import { moveFrame } from "./frames/move.frame";
import { usersService } from "./services/users.service";
import { usernamesFrame } from "./frames/usernames.frame";
import { syncFrame } from "./frames/sync.frame";

export const handlePC = () => {
  document.body.append(renderer.domElement);

  const keyboardController = new KeyboardController();
  const lockController = new LockController();
  const mouseController = new MouseController();

  renderer.setAnimationLoop((t) => {
    moveFrame(keyboardController);
    usernamesFrame();
    syncFrame();
    renderer.render(scene, camera);
  });

  lockController.enterPointerLock();
};
