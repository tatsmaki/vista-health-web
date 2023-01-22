import { Vector3 } from "three";
import { head } from "../3d/head";
import { usersService } from "../services/users.service";

export const pcUsernamesFrame = () => {
  for (let i = 0; i < Object.keys(usersService.models).length; i += 1) {
    const model = Object.values(usersService.models)[i];
    const username = model.children[0];
    username.lookAt(new Vector3(head.position.x, 1.7, head.position.z));
  }
};
