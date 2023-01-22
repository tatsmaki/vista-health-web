import throttle from "lodash.throttle";
import { renderer } from "../renderer";
import { authService } from "../services/auth.service";
import { usersGateway } from "../services/users.gateway";

export const vrSyncFrame = throttle(() => {
  const camera = renderer.xr.getCamera();
  usersGateway.moveUser(authService.user$!, camera.position, camera.rotation);
}, 500);
