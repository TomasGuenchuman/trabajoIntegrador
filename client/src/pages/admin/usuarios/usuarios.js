import React from "react";
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
            <Boton texto="+ añadir usuario" color="lightgreen" />
          </div>
        </div>
        <BasicTable tablaHead={this.state.tablaHead} usuarios={this.state.usuarios} tipo="usuarios" getUsuarios={() => this.getUsuarios()}/>
      </div>
    );
  }
}
