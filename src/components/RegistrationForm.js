import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import {movieApi} from "constants/axios";
import {userRequests} from "constants/requests";
import {tabs} from "pages/LoginPage";

const RegistrationForm = ({setActiveTab}) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    showPassword: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const registerUser = (e) => {
    e.preventDefault();
    movieApi.post(userRequests.register, {
      email: formData.email,
      password: formData.password,
      name: formData.userName,
    }).then((response) => {
      setActiveTab(tabs.LOGIN);
    }).catch((error) => {
      console.log(error);
      setMessage(error.response.data.message);
    })
  };

  return (
    <>
      <div >
        <label>User Name</label>
        <input
          type="text"
          name="userName"
          placeholder="Enter username"
          value={formData.userName}
          onChange={handleChange}
        />
      </div>

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

      <button className="submit" onClick={(e) => registerUser(e)}>Register</button>
      <div className="panel">
        <p>By signing up, you agree to our Terms & Privacy Policy</p>
      </div>
      <span className="form-message">{message}</span>
    </>
  );
};

export default RegistrationForm;
