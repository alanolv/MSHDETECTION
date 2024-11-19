import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../Assets/Images/LogoMSH.png";
import "./login.css";
export default function Login() {
  return (
    <div className="login">
      <div className="navbar">
        <img src={Logo} alt="Logo" width={60} height={50} />
      </div>
      <div className="login-content">
      <div className="login-card">
        <h2>MSHDETECTION</h2>
        <form className="login-form">
          <label htmlFor="username">Usuario:</label>
          <input type="text" id="username" name="username" />
          <br />
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" />
          <br />
          <NavLink to="/Detection" className="btn-submit">
            {" "}
            <button type="submit">Iniciar sesion</button>
          </NavLink>
        </form>
      </div>
      </div>
    </div>
  );
}
