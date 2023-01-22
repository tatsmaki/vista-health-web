import {
  BackSide,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  Texture,
} from "three";

const canvas = document.createElement("canvas");
canvas.width = 16;
canvas.height = 1024;
const context = canvas.getContext("2d")!;
const gradient = context.createLinearGradient(0, 0, 0, 1024);
gradient.addColorStop(0.2, "#C7A3B9");
gradient.addColorStop(0.3, "#DBB4B6");
gradient.addColorStop(0.5, "#DBA495");
gradient.addColorStop(0.6, "#C3ACB1");
context.fillStyle = gradient;
context.fillRect(0, 0, 16, 1024);
const texture = new Texture(canvas);
texture.needsUpdate = true;

const geometry = new IcosahedronGeometry(50, 2);
const material = new MeshBasicMaterial({
  map: texture,
  side: BackSide,
  fog: false,
});

export const environment = new Mesh(geometry, material);
