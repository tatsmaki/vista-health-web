import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { useEffect } from "react";
import { xrController } from "../../controllers/xr.controller";
import { handlePC } from "../../handle-pc";
import { handleVR } from "../../handle-vr";
import { authService } from "../../services/auth.service";
import { usersGateway } from "../../services/users.gateway";
import { usersService } from "../../services/users.service";

const JoinForm = () => {
  const [loading, setLoading] = useState(true);
  const { users$ } = usersService;
  const { user$ } = authService;

  useEffect(() => {
    usersService.getUsers().then(() => setLoading(false));
  }, []);

  const handle3D = () => {
    return xrController
      .requestVrSession()
      .then(() => handleVR())
      .catch(() => handlePC());
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
      {JSON.stringify({
        loading,
        user$,
      })}
      <input
        name="full_name"
        required
        minLength={5}
        maxLength={20}
        placeholder="Full Name"
        disabled={!!user$}
        defaultValue={user$?.full_name}
      />
      <button type="submit" disabled={loading || !!user$}>
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
