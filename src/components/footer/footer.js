import React from "react";
import "./footer.css";
import logo from "../../img/icono_web.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="logo_footer">
          <img src={logo} />
        </div>

        <nav className="links_footer">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/addpropiedad">Admin</Link>
        </nav>
      </div>

      <div className="copyright">
        <p>
          &copy; 2024 - Viajes y Descubrimientos S.A. Todos los derechos
          reservados.
        </p>
      </div>
    </div>
  );
};
export default Footer;
