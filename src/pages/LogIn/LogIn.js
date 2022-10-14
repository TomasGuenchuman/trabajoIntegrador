import React from "react";
import styles from "./LogIn.module.css";
import Boton from "../comun/Boton";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default  class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <Routes>
          <Route path="/logIn" element={<IniciarSesion />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    );
  }
}

class IniciarSesion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.ContenedorLogIn} style={{ display: "flex" }}>
        <div className={styles.LogIn}>
          <Link to="/"><div className={styles.Eliminar} >
            x
          </div></Link>
          <div className={styles.Division}>
            <div className={styles.Texto}>
              <h2>Iniciar sesion</h2>
              <h4>Porfavor ingrese su email y contraseña</h4>
            </div>
            <form className={styles.Form}>
              <input
                style={{ height: 50 }}
                type="email"
                placeholder="Ingrese su email"
              />
              <input
                style={{ height: 50 }}
                type="password"
                placeholder="Ingrese su contraseña"
              />
            </form>
            <div className={styles.Botones}>
              <Boton
                texto="Iniciar sesion"
                color="#DBE2EF"
                width="70%"
                height="50px"
              />
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Boton
                  texto="crear cuenta"
                  color="#DBE2EF"
                  width="70%"
                  height="50px"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.ContenedorLogIn} style={{ display: "flex" }}>
        <div className={styles.LogIn} style={{ height: 650 }}>
          <Link to="/"><div className={styles.Eliminar}>
            x
          </div></Link>
          <div className={styles.Division}>
            <div className={styles.Texto}>
              <h2>registrarse</h2>
              <h4>Porfavor ingrese sus datos para crear la cuenta</h4>
            </div>
            <form className={styles.Form} style={{ flex: 2 }}>
              <input type="text" placeholder="Nombre" />
              <input type="text" placeholder="Apellido" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Contraseña" />
              <input type="password" placeholder="Contraseña" />
            </form>
            <div className={styles.Botones} style={{ flex: 0.8 }}>
              <Boton
                texto="registrarme"
                color="#DBE2EF"
                width="70%"
                height="50px"
              />
              <span>
                ¿Ya tenes cuenta? Inicia sesion{" "}
                <Link
                  to="/logIn"
                  style={{
                    color: "#092e6b",
                    fontFamily: "gadugib",
                    fontSize: 20,
                  }}
                >
                  aca
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
