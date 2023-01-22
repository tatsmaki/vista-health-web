import throttle from "lodash.throttle";
import { camera } from "../3d/camera";
import { authService } from "../services/auth.service";
import { usersGateway } from "../services/users.gateway";

export const pcSyncFrame = throttle(() => {
  usersGateway.moveUser(authService.user$!, camera.position, camera.rotation);
}, 200);
