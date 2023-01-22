import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { useEffect } from "react";
import { Devices } from "../../constants/devices.constants";
import { xrController } from "../../controllers/xr.controller";
import { handlePC } from "../../handle-pc";
import { handleVR } from "../../handle-vr";
import { authService } from "../../services/auth.service";
import { usersGateway } from "../../services/users.gateway";
import { usersService } from "../../services/users.service";

const JoinForm = () => {
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState(Devices.Unknown);
  const { users$ } = usersService;
  const { user$ } = authService;

  useEffect(() => {
    usersService.getUsers().then(() => setLoading(false));
    xrController.requestVrSession().then(setDevice);
  }, []);

  const handle3D = () => {
    if (device === Devices.PC) {
      handlePC();
    } else {
      xrController.enterVrSession().then(handleVR);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    // @ts-ignore
    const full_name = event.target["full_name"].value;
    usersService
      .createUser(full_name, "PC")
      .then((user) => {
        usersGateway.createUser(user);
        authService.login(user);
        return handle3D();
      })
      .finally(() => setLoading(false));
  };

  return (
    <form className="join_form" onSubmit={handleSubmit}>
      <span>People connected: {users$.length}</span>
      <input
        name="full_name"
        required
        minLength={5}
        maxLength={20}
        placeholder="Full Name"
        disabled={!!user$}
        defaultValue={user$?.full_name}
      />
      <button
        type="submit"
        disabled={loading || device === Devices.Unknown || !!user$}
      >
        {user$ ? "Joined" : "Join"}
      </button>
      {user$ && (
        <button type="button" onClick={handle3D}>
          Continue
        </button>
      )}
    </form>
  );
};

export default observer(JoinForm);
