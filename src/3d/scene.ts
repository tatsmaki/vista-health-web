import { Color, FogExp2, Scene } from "three";
import { camera } from "./camera";
import { floor } from "./floor";
import { ambientLight } from "./ambient-light";
import { directionalLight } from "./directional-light";
import { environment } from "./environment";
import { Sphere } from "./sphere";

export const scene = new Scene();
scene.background = new Color(0xffffff);
scene.fog = new FogExp2(0xdba495, 0.02);
scene.add(camera);
scene.add(floor);
scene.add(ambientLight, directionalLight);
scene.add(environment);
scene.add(
  new Sphere(15, 4, 5, 1.5).build(),
  new Sphere(16, 9, 8, 3).build(),
  new Sphere(-5, 15, 10, 3).build(),
  new Sphere(-17, 6, 0, 2).build(),
  new Sphere(4, 3, -40, 2.5).build()
);
