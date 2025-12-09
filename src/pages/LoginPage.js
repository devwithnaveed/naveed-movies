import React, { useState } from "react";
import classNames from "classnames";
import LoginForm from "components/LoginForm";
import RegistrationForm from "components/RegistrationForm";
import "styles/LoginPage.css";

const tabs = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
};

const LoginPage = () => {
  const [tab, setTab] = useState(tabs.LOGIN);

  return (
    <div className="container">
      <div className="login-wrapper">
        <div className="nav-buttons">
          <button
            id="loginButton"
            className={classNames({ active: tab === tabs.LOGIN })}
            onClick={() => setTab(tabs.LOGIN)}
          >
            Login
          </button>

          <button
            id="registerButton"
            className={classNames({ active: tab === tabs.REGISTER })}
            onClick={() => setTab(tabs.REGISTER)}
          >
            Register
          </button>
        </div>

        {tab === tabs.LOGIN ? <LoginForm /> : <RegistrationForm />}
      </div>
    </div>
  );
};

export default LoginPage;
