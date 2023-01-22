import { Vector3 } from "three";

export class KeyboardController {
  private w = false;
  private a = false;
  private s = false;
  private d = false;

  constructor() {
    document.onkeydown = this.handleKeyDown.bind(this);
    document.onkeyup = this.handleKeyUp.bind(this);
  }

  private handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "w": {
        this.w = true;
        break;
      }
      case "a": {
        this.a = true;
        break;
      }
      case "s": {
        this.s = true;
        break;
      }
      case "d": {
        this.d = true;
        break;
      }
      default: {
        break;
      }
    }
  }

  private handleKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case "w": {
        this.w = false;
        break;
      }
      case "a": {
        this.a = false;
        break;
      }
      case "s": {
        this.s = false;
        break;
      }
      case "d": {
        this.d = false;
        break;
      }
      default: {
        break;
      }
    }
  }

  get direction() {
    const x = Number(this.d) - Number(this.a);
    const z = Number(this.s) - Number(this.w);
    return new Vector3(x, 0, z);
  }
}
