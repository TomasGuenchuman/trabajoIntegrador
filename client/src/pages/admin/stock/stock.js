import React from "react";
import BasicTable from "../../../components/comun/tabla/tabla";
import Boton from "../../../components/comun/boton/Boton";
import axios from "axios";
export default class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablaHead: [{ head: "Nombre" }, { head: "Imagen" }, { head: "Cantidad" }],
      stock: [],
    };
  }
  componentDidMount() {
    this.getStock();
  }
  getStock() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/stock").then((res) => {
        resolve(this.setState({ stock: res.data }));
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
            <h1>Stock</h1>
          </div>
        </div>
        <BasicTable
          tablaHead={this.state.tablaHead}
          stock={this.state.stock}
          tipo="stock"
        />
      </div>
    );
  }
}
