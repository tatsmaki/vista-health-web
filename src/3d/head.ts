import { Group, PerspectiveCamera } from "three";

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

export const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 1.7, 0);

export const head = new Group();
head.add(camera);
