import { renderer } from "./renderer";
import { scene } from "./3d/scene";
import { camera } from "./3d/head";
import { vrUsernamesFrame } from "./frames/vr-usernames.frame";
import { vrSyncFrame } from "./frames/vr-sync.frame";

export const handleVR = () => {
  renderer.xr.enabled = true;

  renderer.setAnimationLoop((t) => {
    vrUsernamesFrame();
    vrSyncFrame();
    renderer.render(scene, camera);
  });
};
