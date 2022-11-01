import React from "react";
import styles from "./LogIn.module.css";
import Boton from "../../components/comun/Boton";
import mostrar from "../../assets/showPassword.png";
import ocultar from "../../assets/hiddenPassword.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: mostrar,
    };
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
    this.state = {
      password: "password",
    };
  }
  mostrarContraseña() {
    let { password } = this.state;
    if (password === "password") {
      password = "text";
    } else {
      password = "password";
    }
    this.setState({ password });
  }
  render() {
    const { password } = this.state;
    return (
      <div className={styles.ContenedorLogIn} style={{ display: "flex" }}>
        <div className={styles.LogIn}>
          <Link to="/">
            <div className={styles.Eliminar}>x</div>
          </Link>
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
                required
              />
              <input
                style={{ height: 50 }}
                type={password}
                placeholder="Ingrese su contraseña"
                required
              />
              <img
                alt="contraseña"
                src={password === "password" ? ocultar : mostrar}
                style={{
                  position: "absolute",
                  width: 35,
                  height: 35,
                  right: 80,
                  bottom: 185,
                }}
                onClick={() => this.mostrarContraseña()}
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
    this.state = {
      password: "password",
      rePassword: "password",
    };
  }
  mostrarContraseña() {
    let { password } = this.state;
    if (password === "password") {
      password = "text";
    } else {
      password = "password";
    }
    this.setState({ password });
  }

  mostrarReContraseña() {
    let { rePassword } = this.state;
    if (rePassword === "password") {
      rePassword = "text";
    } else {
      rePassword = "password";
    }
    this.setState({ rePassword });
  }
  render() {
    const { password, rePassword } = this.state;
    return (
      <div className={styles.ContenedorLogIn} style={{ display: "flex" }}>
        <div className={styles.LogIn} style={{ height: 650 }}>
          <Link to="/">
            <div className={styles.Eliminar}>x</div>
          </Link>
          <div className={styles.Division}>
            <div className={styles.Texto}>
              <h2>registrarse</h2>
              <h4>Porfavor ingrese sus datos para crear la cuenta</h4>
            </div>
            <form className={styles.Form} style={{ flex: 2 }}>
              <input type="text" placeholder="Nombre" required />
              <input type="text" placeholder="Apellido" required />
              <input type="email" placeholder="Email" required />
              <input type={password} placeholder="Contraseña" required />
              <img
                alt="contraseña"
                src={password === "password" ? ocultar : mostrar}
                style={{
                  position: "absolute",
                  width: 35,
                  height: 35,
                  right: 80,
                  bottom: 240,
                }}
                onClick={() => this.mostrarContraseña()}
              />
              <input
                type={rePassword}
                placeholder="Repetir contraseña"
                required
              />
              <img
                alt="contraseña"
                src={rePassword === "password" ? ocultar : mostrar}
                style={{
                  position: "absolute",
                  width: 35,
                  height: 35,
                  right: 80,
                  bottom: 170,
                }}
                onClick={() => this.mostrarReContraseña()}
              />
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
