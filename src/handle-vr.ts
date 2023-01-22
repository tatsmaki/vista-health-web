import { renderer } from "./renderer";
import { scene } from "./3d/scene";
import { camera } from "./3d/head";
import { vrUsersFrame } from "./frames/vr-users.frame";
import { vrSyncFrame } from "./frames/vr-sync.frame";

export const handleVR = () => {
  renderer.xr.enabled = true;

  renderer.setAnimationLoop((t) => {
    vrUsersFrame();
    vrSyncFrame();
    renderer.render(scene, camera);
  });
};
