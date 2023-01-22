import { Vector3 } from "three";
import { renderer } from "../renderer";
import { usersService } from "../services/users.service";

export const vrUsernamesFrame = () => {
  const keys = Object.keys(usersService.models);
  const models = Object.values(usersService.models);
  for (let i = 0; i < keys.length; i += 1) {
    const model = models[i];
    const username = model.children[0];
    const camera = renderer.xr.getCamera();
    username.lookAt(new Vector3(camera.position.x, 1.7, camera.position.z));
  }
};
