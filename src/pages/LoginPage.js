import React, { useState } from "react";
import classNames from "classnames";
import LoginForm from "components/LoginForm";
import RegistrationForm from "components/RegistrationForm";
import "styles/LoginPage.css";
import {useSpring, animated} from "react-spring";

export const tabs = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
};

const isRegisterForm = (tab) => tab === tabs.REGISTER;

const LoginPage = () => {
  const [tab, setTab] = useState(tabs.LOGIN);

  const loginProps = useSpring({
    left: isRegisterForm(tab) ? -500 : 0,
  })

  const registeredProps = useSpring({
    left: isRegisterForm(tab) ? 0 : 500,
  })
  const loginButtonProps = useSpring({
    borderBottom: isRegisterForm(tab) ? 'solid 0px transparent' : 'solid 2px #4d0000',
  })

  const registerButtonProps = useSpring({
    borderBottom: isRegisterForm(tab) ? 'solid 2px #4d0000' : 'solid 0px transparent',
  })
  return (
    <div className="container">
      <div className="login-wrapper">
        <div className="nav-buttons">
          <animated.button id="loginButton" style={loginButtonProps} onClick={() => setTab(tabs.LOGIN)}
          >
            Login
          </animated.button>
          <animated.button id="registerButton" style={registerButtonProps} onClick={() => setTab(tabs.REGISTER)}
          >
            Register
          </animated.button>
          <div className="form-group">
            {tab === tabs.LOGIN  &&
              <animated.form action="" id="loginForm" style={loginProps}>
                <LoginForm />
              </animated.form>
            }
            {tab === tabs.REGISTER  &&
            <animated.form action="" id="resgiterForm" style={registeredProps}>
              <RegistrationForm  setActiveTab={setTab} />
            </animated.form>
            }

          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
