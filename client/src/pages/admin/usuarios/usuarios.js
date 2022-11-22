import React from "react";
import styles from "./usuarios.module.css";
import BasicTable from "../../../components/comun/tabla/tabla";
import Boton from "../../../components/comun/boton/Boton";
import axios from "axios";
export default class Usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablaHead: [
        { head: "Avatar" },
        { head: "Nombre" },
        { head: "Email" },
        { head: "Permiso" },
        { head: "Action" },
      ],
      usuarios: [],
      mostrarCard: false,
    };
  }
  componentDidMount() {
    this.getUsuarios();
  }
  getUsuarios() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/usuarios").then((res) => {
        resolve(this.setState({ usuarios: res.data }));
      });
    });
  }
  mostrarCard() {
    this.setState({ mostrarCard: true });
  }
  esconderCard() {
    this.setState({ mostrarCard: false });
  }
  render() {
    return (
      <div
        style={{
          width: "95%",
          height: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {this.state.mostrarCard === true ? (
          <AñadirUsuario
            esconderCard={() => this.esconderCard()}
            getUsuarios={() => this.getUsuarios()}
          />
        ) : (
          ""
        )}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <div>
            <h1>Usuarios</h1>
          </div>
          <div>
            <Boton
              texto="+ añadir usuario"
              color="lightgreen"
              funcion={() => this.mostrarCard()}
            />
          </div>
        </div>
        <BasicTable
          tablaHead={this.state.tablaHead}
          usuarios={this.state.usuarios}
          tipo="usuarios"
          getUsuarios={() => this.getUsuarios()}
        />
      </div>
    );
  }
}

class AñadirUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      nombre: "",
      email: "",
      permiso: "",
      contraseña: "",
      emailValido: false,
      emails: [],
    };
  }
  componentDidMount() {
    this.getEmails();
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
  getPermiso(e) {
    this.setState({ permiso: e });
  }
  getContraseña(e) {
    this.setState({ contraseña: e });
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
        resolve(true);
      } else {
        this.setState({ emailValido: false });
        resolve(false);
      }
    });
  }
  async postUsuario() {
    if(this.state.avatar === ""){
      this.setState({avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"})
    }
    let promiseEmail = await this.verificarEmail();
    const { avatar, nombre, email, permiso, contraseña, emailValido } =
      this.state;

    if ((emailValido === true || promiseEmail === true) && email.length !== 0) {
      return new Promise((resolve, reject) => {
        axios.post("http://localhost:5000/api/usuarios", {
          avatar: avatar === ""? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : avatar,
          nombre: nombre,
          email: email,
          permiso: permiso,
          contraseña: contraseña,
        });
        setTimeout(() => {
          this.props.esconderCard();
          alert("Usuario añadido");
          this.props.getUsuarios();
        }, 300);
      });
    } else if (
      emailValido === false ||
      email.search("@") === -1 ||
      email.search(".") === -1
    ) {
      alert("Mail Invalido");
      this.getEmails();
    } else {
      alert("error");
    }
  }
  render() {
    const { categorias, esconderCard } = this.props;
    return (
      <div className={styles.ContenedorAñadir}>
        <img
          alt="Foto de usuario"
          src={this.state.avatar}
          width="200px"
          height="150px"
          style={{ borderRadius: "2%" }}
        />
        <label>Imagen:</label>
        <input
          type="text"
          placeholder="Link foto de perfil"
          onChange={(e) => this.getAvatar(e.target.value)}
        />
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Nombre"
          onChange={(e) => this.getNombre(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => this.getEmail(e.target.value)}
        />
        <label>Permiso:</label>
        <input
          list="permiso"
          placeholder="permiso del usuario"
          onChange={(e) => this.getPermiso(e.target.value)}
        />
        <datalist id="permiso" value="1">
          <option value="admin">Administrador</option>
          <option value="user">Usuario</option>
        </datalist>
        <label>Contraseña:</label>
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => this.getContraseña(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <Boton
            texto="Cancelar"
            color="red"
            width="100px"
            height="50px"
            funcion={() => esconderCard()}
          />
          <Boton
            texto="Añadir"
            color="lightgreen"
            width="100px"
            height="50px"
            funcion={() => this.postUsuario()}
          />
        </div>
      </div>
    );
  }
}
