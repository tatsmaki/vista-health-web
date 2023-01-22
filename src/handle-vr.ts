import { renderer } from "./renderer";
import { scene } from "./3d/scene";
import { camera } from "./3d/head";

export const handleVR = () => {
  renderer.xr.enabled = true;

  renderer.setAnimationLoop((t) => {
    renderer.render(scene, camera);
  });
};
