import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import {movieApi} from "../constants/axios";
import {userRequests} from "../constants/requests";
import {useNavigate} from "react-router-dom";
import useAppStateContext from "../hooks/useAppStateContext";

const LoginForm = () => {
  const { dispatch } = useAppStateContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password) {
      setMessage("Please enter a email or password");
      return;
    }
    movieApi.post(userRequests.login, {
      email: formData.email,
      password: formData.password,
    }).then((res) => {
      dispatch({
        type: "Login",
        payload: {
          token: res?.data?.token,
          email: formData?.email,
        },
      });
      navigate('/home');
    }).catch((error) => {
      setMessage(error.response.data.message);
    })

  };

  return (
    <>
      <div >
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div >
        <label>Password</label>
        <input
          type={formData.showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />
        <span onClick={togglePassword} style={{ cursor: "pointer" }}>
          {formData.showPassword ? (
            <FontAwesomeIcon icon={faEyeSlash} className="customIcon" />
          ) : (
            <FontAwesomeIcon icon={faEye} className="customIcon" />
          )}
        </span>
      </div>

      <button className="submit" onClick={(e) => handleAuth(e)}>Login</button>
      <span className="form-message">{message}</span>

    </>
  );
};

export default LoginForm;
