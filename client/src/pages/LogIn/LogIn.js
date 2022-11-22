import React from "react";
import styles from "./LogIn.module.css";
import Boton from "../../components/comun/boton/Boton";
import mostrar from "../../assets/showPassword.png";
import ocultar from "../../assets/hiddenPassword.png";
import axios from "axios";
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
        <Route
          path="/logIn"
          element={
            <IniciarSesion
              ingresoLogIn={(nombre, permiso, avatar, id) =>
                this.props.ingresoLogIn(nombre, permiso, avatar, id)
              }
              getCarrito={(id) => this.props.getCarrito(id)}
            />
          }
        />
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
      emails: [],
      email: "",
      contraseña: "",
    };
  }
  componentDidMount() {
    this.getEmails();
  }
  getEmails() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/usuarios/login").then((res) => {
        resolve(this.setState({ emails: res.data }));
      });
    });
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
  verificarEmail() {
    const { emails } = this.state;
    let mapEmails = [];
    mapEmails = emails.map((email) => {
      if (
        email.email === this.state.email &&
        email.contraseña === this.state.contraseña
      ) {
        return true; //hay undefined si es true
      }
    });
    const found = mapEmails.includes(true);
    const indexEmail = mapEmails.indexOf(mapEmails.includes(true));
    if (found === true) {
      this.props.getCarrito(emails[indexEmail].id);
      this.props.ingresoLogIn(
        emails[indexEmail].nombre,
        emails[indexEmail].permiso,
        emails[indexEmail].avatar,
        emails[indexEmail].id
      );
      alert(
        "Usuario ingresado correctamente,porfavor cerrar ventana de LOG IN"
      );
    } else {
      alert("Email o contraseña incorrectos");
    }
    console.log(mapEmails);
    console.log(found);
    console.log(indexEmail);
  }
  getEmail(e) {
    this.setState({ email: e });
  }
  getContraseña(e) {
    this.setState({ contraseña: e });
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
                onChange={(e) => this.getEmail(e.target.value)}
                required
              />
              <input
                style={{ height: 50 }}
                type={password}
                placeholder="Ingrese su contraseña"
                onChange={(e) => this.getContraseña(e.target.value)}
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
                funcion={() => this.verificarEmail()}
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
      avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      nombre: "",
      email: "",
      permiso: "user",
      contraseña: "",
      reContraseña: "",
      emailValido: false,
      emails: [],
    };
  }
  componentDidMount() {
    this.getEmails();
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
  getAvatar(e) {
    this.setState({ avatar: "" });
    this.setState({ avatar: e });
  }
  getNombre(e) {
    this.setState({ nombre: e });
  }
  getEmail(e) {
    this.setState({ email: e });
  }
  getContraseña(e) {
    this.setState({ contraseña: e });
  }
  getReContraseña(e) {
    this.setState({ reContraseña: e });
  }
  resetDatos() {
    this.setState({
      avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      nombre: "",
      email: "",
      contraseña: "",
      reContraseña: "",
      emailValido: false,
    });
    this.getEmails();
  }
  async postUsuario() {
    const { avatar, nombre, email, permiso, contraseña, emailValido } =
      this.state;

    let verificarEmail = await this.verificarEmail();
    console.log(verificarEmail);
    if (
      contraseña === this.state.reContraseña &&
      (emailValido === true || verificarEmail === true) &&
      email.length !== 0
    ) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios.post("http://localhost:5000/api/usuarios", {
            avatar: avatar === ""? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : avatar,
            nombre: nombre,
            email: email,
            permiso: permiso,
            contraseña: contraseña,
          });
          alert("Usuario Creado");
          this.resetDatos();
        }, 100);
      });
    } else if (contraseña !== this.state.reContraseña) {
      alert("Contraseña invalida");
    } else if (
      (emailValido === false || verificarEmail === false ) ||
      email.search("@") === -1 ||
      email.search(".") === -1
    ) {
      alert("Mail Invalido");
    } else {
      alert()
      alert("error");
    }
  }
  getEmails() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/usuarios/email").then((res) => {
        resolve(this.setState({ emails: res.data }));
      });
    });
  }
  verificarEmail() {
    return new Promise((resolve, reject) => {
      const { emails } = this.state;
      let mapEmails = [];
      mapEmails = emails.map((email) => {
        if (email.email !== this.state.email) {
          return true; //hay undefined si es true
        }
      });
      const found = mapEmails.some((element) => element === undefined);
      if (found === false) {
        this.setState({ emailValido: true });
        this.getEmails();
        setTimeout(() => {
          resolve(true);
        }, 50);
      } else {
        this.setState({ emailValido: false });
        this.getEmails();
        setTimeout(() => {
          resolve(false);
        }, 50);
      }
      console.log(mapEmails);
      console.log(found);
    });
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
              <h2 onClick={() => this.verificarEmail()}>registrarse</h2>
              <h4>Porfavor ingrese sus datos para crear la cuenta</h4>
            </div>
            <form className={styles.Form} style={{ flex: 2 }}>
              <input
                type="text"
                placeholder="Nombre"
                value={this.state.nombre}
                onChange={(e) => this.getNombre(e.target.value)}
                maxLength="30"
                required
              />
              <input
                type="text"
                placeholder="Link imagen avatar"
                onChange={(e) => this.getAvatar(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => this.getEmail(e.target.value)}
                maxLength="300"
                required
              />
              <input
                type={password}
                placeholder="Contraseña"
                value={this.state.contraseña}
                onChange={(e) => this.getContraseña(e.target.value)}
                maxLength="30"
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
                  bottom: 240,
                }}
                onClick={() => this.mostrarContraseña()}
              />
              <input
                type={rePassword}
                placeholder="Repetir contraseña"
                value={this.state.reContraseña}
                onChange={(e) => this.getReContraseña(e.target.value)}
                maxLength="30"
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
                funcion={() => this.postUsuario()}
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
