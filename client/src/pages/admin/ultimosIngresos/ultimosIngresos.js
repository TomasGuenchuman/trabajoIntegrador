import React from "react";
import BasicTable from "../../../components/comun/tabla/tabla";
import Boton from "../../../components/comun/boton/Boton";
import axios from "axios";
export default class UltimosIngresos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablaHead: [
        { head: "Nombre" },
        { head: "Producto Id" },
        { head: "Imagen" },
        { head: "Cantidad" },
        { head: "Action" },
      ],
      ultimosIngresos: [],
    };
  }
  componentDidMount() {
    this.getUltimosIngresos();
  }
  getUltimosIngresos() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/ultimosIngresos").then((res) => {
        resolve(this.setState({ ultimosIngresos: res.data }));
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
            <h1>Ultimos ingresos</h1>
          </div>
          <div>
            <Boton texto="+ añadir nuevo ingreso" color="lightgreen" />
          </div>
        </div>
        <BasicTable tablaHead={this.state.tablaHead} ultimosIngresos={this.state.ultimosIngresos} tipo="ultimosIngresos" getUltimosIngresos={() => this.getUltimosIngresos()}/>
      </div>
    );
  }
}
