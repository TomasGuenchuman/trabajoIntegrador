import React from "react";
import styles from "./Navbar.module.css";
import Boton from "../comun/boton/Boton";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.Navbar}>
        <Link to="/" style={{ margin: 5 }}>
          <div className={styles.Logo}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968260.png"
              alt="Logo"
              style={{ width: "9vh" }}
            />
          </div>
        </Link>
        <div className={styles.Opciones}>
          {this.props.logInPermiso === "admin" ? (
            <Link to="/admin">
              <Boton texto="admin" color="lightgrey" />
            </Link>
          ) : (
            ""
          )}

          <Link to="/contacto">
            <Boton texto="Contactanos" color="lightgrey" />
          </Link>

          {this.props.logInEstado === false ? (
            <Link to="/logIn">
              <Boton texto="Iniciar Sesion" color="lightgrey" />
            </Link>
          ) : this.props.logInPermiso === "admin" ? (
            ""
          ) : (
            <Link to="/" className={styles.CerrarSesion}>
              <Boton
                texto="Cerrar Sesion"
                color="lightgrey"
                funcion={() => this.props.cerrarSesion()}
              />
            </Link>
          )}

          <div>
            <span
              className={styles.ContadorCarrito}
              style={{
                display: this.props.acumuladorCarrito >= 1 ? "flex" : "none",
              }}
            >
              {this.props.acumuladorCarrito}
            </span>
            <Link
              to="/carrito"
              onClick={() => this.props.resetContadorcarrito()}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2838/2838895.png"
                alt="carrito"
                style={{ width: "5vh", cursor: "pointer" }}
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
