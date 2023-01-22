import { renderer } from "../renderer";

export class XrController {
  private readonly mode = "immersive-vr";
  private session: XRSession | null = null;

  constructor() {
    this.onSessionEnd = this.onSessionEnd.bind(this);
  }

  async requestVrSession() {
    if (navigator.xr) {
      await navigator.xr.isSessionSupported(this.mode);
      return this.enterVrSession();
    }
  }

  async enterVrSession() {
    if (navigator.xr) {
      this.session = await navigator.xr.requestSession(this.mode);
      this.session.onend = this.onSessionEnd;
      await renderer.xr.setSession(this.session);
    }
  }

  private onSessionEnd() {
    this.session = null;
    renderer.dispose();
  }
}

export const xrController = new XrController();
