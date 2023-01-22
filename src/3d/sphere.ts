import { Mesh, MeshStandardMaterial, SphereGeometry, Vector3 } from "three";

export class Sphere {
  private position: Vector3;
  private radius: number;

  constructor(x: number, y: number, z: number, radius: number) {
    this.position = new Vector3(x, y, z);
    this.radius = radius;
  }

  build() {
    const geometry = new SphereGeometry(this.radius);
    const material = new MeshStandardMaterial({ color: 0xa292aa });
    const mesh = new Mesh(geometry, material);
    mesh.position.add(this.position);
    return mesh;
  }
}
