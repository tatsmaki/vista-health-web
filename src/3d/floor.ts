import { PlaneGeometry, sRGBEncoding } from "three";
import { Water } from "three/examples/jsm/objects/Water2";
import { degToRad } from "three/src/math/MathUtils";

const geometry = new PlaneGeometry(100, 100);

export const floor = new Water(geometry, {
  color: 0xffffff,
  scale: 1,
  textureWidth: 512,
  textureHeight: 512,
  clipBias: 0.06,
});
floor.position.set(0, 0, 0);
floor.rotation.set(degToRad(-90), 0, 0);
