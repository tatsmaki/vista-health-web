import { Devices } from "../constants/devices.constants";
import { renderer } from "../renderer";

export class XrController {
  private readonly mode = "immersive-vr";
  private session: XRSession | null = null;

  constructor() {
    this.onSessionEnd = this.onSessionEnd.bind(this);
  }

  async requestVrSession() {
    if (navigator.xr) {
      const isSupported = await navigator.xr.isSessionSupported(this.mode);
      if (isSupported) {
        return Devices.VR;
      }
      return Devices.PC;
    }
    if (navigator.userAgent.includes("Mac OS")) {
      return Devices.PC;
    }
    return Devices.Unknown;
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
