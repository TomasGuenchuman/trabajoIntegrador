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
            <Boton texto="+ añadir usuario" color="lightgreen" funcion={() => this.mostrarCard()}/>
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
      avatar: "",
      nombre: "",
      email: "",
      permiso: "",
      contraseña: "",
      setPost: null,
    };
  }
  getAvatar(e) {
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
  postProducto() {
    const { avatar, nombre, email, permiso, contraseña } = this.state;
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:5000/api/usuarios", {
          avatar: avatar,
          nombre: nombre,
          email: email,
          permiso: permiso,
          contraseña: contraseña,
        })
        .then((response) => {
          resolve(this.state.setPost(response.data));
        });
      setTimeout(() => {
        this.props.esconderCard();
        alert("Producto añadido");
        this.props.getUsuarios();
      }, 300);
    });
  }
  render() {
    const { categorias, esconderCard } = this.props;
    return (
      <div className={styles.ContenedorAñadir}>
        <img alt="Foto de producto" src={this.state.avatar} width="200px" />
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
          onChange={(e) => this.getEmail(e.target.value)}
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
            funcion={() => this.postProducto()}
          />
        </div>
      </div>
    );
  }
}
