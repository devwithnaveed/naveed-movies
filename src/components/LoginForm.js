import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setFormData({ ...formData, showPassword: !formData.showPassword });
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
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
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

      <button type="submit" className="submit">Login</button>
    </form>
  );
};

export default LoginForm;
