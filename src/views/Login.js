import React from "react";
import { useGlobalLoginState } from "../api";
import { useHistory } from "react-router-dom";

export function Login(props) {
  const [usernameTextboxValue, setUsernameTextboxValue] = React.useState("");
  // eslint-disable-next-line no-unused-vars
  const [currentUsername, usernameActions] = useGlobalLoginState();
  const history = useHistory();

  return (
    <div>
      <div>
        In order to get this application out as quickly as possible, we've cut
        some corners. One of those corners is logins / passwords. So instead of
        a real login form, you just need to pick a username and there is no
        password for anyone. Obviously this wouldn't be a good strategy in a
        real application, but our purpose for this exercise is not user
        management, so we've skipped it.
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (usernameTextboxValue !== "") {
            usernameActions.login(usernameTextboxValue);
            history.push("/threads");
          } else {
            alert("Please use a non-empty username to log in");
          }
        }}
      >
        <input
          type="text"
          value={usernameTextboxValue}
          placeholder="username"
          onChange={e => {
            e.preventDefault();
            setUsernameTextboxValue(e.target.value);
          }}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
