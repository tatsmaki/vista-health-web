import { renderer } from "./renderer";
import { scene } from "./3d/scene";
import { camera } from "./3d/head";
import { KeyboardController } from "./controllers/keyboard.controller";
import { LockController } from "./controllers/lock.controller";
import { MouseController } from "./controllers/mouse.controller";
import { moveFrame } from "./frames/move.frame";
import { pcUsersFrame } from "./frames/pc-users.frame";
import { pcSyncFrame } from "./frames/pc-sync.frame";

export const handlePC = () => {
  document.body.append(renderer.domElement);

  const keyboardController = new KeyboardController();
  const lockController = new LockController();
  const mouseController = new MouseController();

  renderer.setAnimationLoop((t) => {
    moveFrame(keyboardController);
    pcUsersFrame();
    pcSyncFrame();
    renderer.render(scene, camera);
  });

  lockController.enterPointerLock();
};
