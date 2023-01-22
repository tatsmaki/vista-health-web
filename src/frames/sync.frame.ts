import throttle from "lodash.throttle";
import { head } from "../3d/head";
import { authService } from "../services/auth.service";
import { usersGateway } from "../services/users.gateway";

export const syncFrame = throttle(() => {
  usersGateway.moveUser(authService.user$!, head.position, head.rotation);
}, 500);
