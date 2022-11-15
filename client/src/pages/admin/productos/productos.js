import React from "react";
import styles from "./productos.module.css";
import BasicTable from "../../../components/comun/tabla/tabla";
import Boton from "../../../components/comun/boton/Boton";
import axios from "axios";
export default class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablaHead: [
        { head: "Nombre" },
        { head: "Imagen" },
        { head: "Precio" },
        { head: "Action" },
      ],
      productos: [],
    };
  }
  componentDidMount() {
    this.getProductos();
  }
  getProductos() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/productos").then((res) => {
        resolve(this.setState({ productos: res.data }));
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
            <h1>Productos</h1>
          </div>
          <div>
            <Boton texto="+ añadir producto" color="lightgreen" />
          </div>
        </div>
        <BasicTable tablaHead={this.state.tablaHead} productos={this.state.productos} tipo="productos"/>
      </div>
    );
  }
}
