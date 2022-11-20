import React from "react";
import styles from "./productos.module.css";
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
      mostrarCard: false,
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
          <AñadirIngreso
            esconderCard={() => this.esconderCard()}
            getUltimosIngresos={() => this.getUltimosIngresos()}
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
            <h1>Ultimos ingresos</h1>
          </div>
          <div>
            <Boton
              texto="+ añadir nuevo ingreso"
              color="lightgreen"
              funcion={() => this.mostrarCard()}
            />
          </div>
        </div>
        <BasicTable
          tablaHead={this.state.tablaHead}
          ultimosIngresos={this.state.ultimosIngresos}
          tipo="ultimosIngresos"
          getUltimosIngresos={() => this.getUltimosIngresos()}
        />
      </div>
    );
  }
}

class AñadirIngreso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_producto: "",
      cantidad: "",
      imagen: "",
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
  async getId_producto(e) {
    this.setState({ id_producto: Number(e) });
    this.getProductoElegido(Number(e));
  }
  getCantidad(e) {
    this.setState({ cantidad: Number(e) });
  }
  /*getImagen() {
    this.setState({imagen: })
  }*/
  getProductoElegido(id) {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:5000/api/productos/productoElegido?id=" + id)
        .then((res) => {
          let info = res.data[0];
          let imagen = info.imagen;
          resolve(this.setState({ imagen: imagen }));
        });
    });
  }
  postIngreso() {
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:5000/api/ultimosIngresos", {
        id_producto: this.state.id_producto,
        cantidad: this.state.cantidad,
      });
      setTimeout(() => {
        this.props.esconderCard();
        alert("Producto añadido");
        this.props.getUltimosIngresos();
      }, 300);
    });
  }
  render() {
    const { esconderCard } = this.props;
    const { productos } = this.state;
    return (
      <div className={styles.ContenedorAñadir}>
        <img alt="Foto de producto" src={this.state.imagen} width="200px" />
        <label>Cantidad:</label>
        <input
          type="number"
          placeholder="Cantidad de productos"
          onChange={(e) => this.getCantidad(e.target.value)}
        />
        <label>Producto:</label>
        <input
          list="ingresos"
          placeholder="Categoria del producto"
          onChange={(e) => this.getId_producto(e.target.value)}
        />
        <datalist id="ingresos" value="1">
          {productos.map((producto) => {
            return <option value={producto.id}>{producto.nombre}</option>;
          })}
        </datalist>
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
            funcion={() => this.postIngreso()}
          />
        </div>
      </div>
    );
  }
}
