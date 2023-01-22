import { DirectionalLight } from "three";

export const directionalLight = new DirectionalLight(0xb2774b, 0.7);
directionalLight.position.set(-1, -3, 0);
directionalLight.lookAt(0, 0, 0);
