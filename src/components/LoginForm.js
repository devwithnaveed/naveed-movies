import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import React, {useReducer} from "react";

const initialState = {
  email: "",
  password: "",
  isShowPassword: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_SHOW_PASSWORD":
      return { ...state, isShowPassword: !state.isShowPassword };
    default:
      return state;
  }
}

const LoginForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlePasswordCToggle = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_SHOW_PASSWORD" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form id="loginform" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type={state.isShowPassword ? "text" : "password"}
          placeholder="Enter password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
        />
        <span onClick={handlePasswordCToggle} style={{ cursor: "pointer" }}>
          {state.isShowPassword ? (
            <FontAwesomeIcon icon={faEyeSlash} className="customIcon"/>
          ) : (
            <FontAwesomeIcon icon={faEye} className="customIcon"/>
          )}
        </span>
      </div>

      <button type="submit" className="submit">Login</button>
    </form>
  );
};

export default LoginForm;
