import { renderer } from "../renderer";

export class LockController {
  constructor() {
    document.onpointerlockchange = this.handlePointerLockChange.bind(this);
  }

  enterPointerLock() {
    if (document.pointerLockElement !== renderer.domElement) {
      renderer.domElement.requestPointerLock();
    }
  }

  exitPointerLock() {
    if (document.pointerLockElement === renderer.domElement) {
      document.exitPointerLock();
    }
  }

  private handlePointerLockChange() {
    if (!document.pointerLockElement) {
      renderer.domElement.remove();
      renderer.dispose();
    }
  }
}
