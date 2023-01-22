import { renderer } from "../renderer";

export class XrController {
  private readonly mode = "immersive-vr";
  private session: XRSession | null = null;

  constructor() {
    this.onSessionEnd = this.onSessionEnd.bind(this);
  }

  requestVrSession() {
    if (navigator.xr) {
      return navigator.xr.isSessionSupported(this.mode);
    }
    return Promise.resolve(false);
  }

  async enterVrSession() {
    if (navigator.xr) {
      const options = {
        optionalFeatures: ["local-floor"],
      };
      this.session = await navigator.xr.requestSession(this.mode, options);
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
