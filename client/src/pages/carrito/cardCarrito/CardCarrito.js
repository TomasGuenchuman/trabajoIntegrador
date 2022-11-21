import React from "react";
import styles from "./CardCarrito.module.css";
import Boton from "../../../components/comun/boton/Boton";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
export default class CardCarrito extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cantidadPost: 0,
      mostrarEditarCantidad: false,
      cantidadPersonalizada: 0,
    };
  }

  getCantidadSelect(e) {
    if (e === "10+") {
      this.setState({ mostrarEditarCantidad: true });
    } else {
      this.setState({ cantidadPost: Number(e) });
      setTimeout(() => {
        this.putProducto();
      }, 500);
    }
  }
  cantidadPersonalizada(e) {
    this.setState({ cantidadPersonalizada: Number(e) });
  }
  getCantidadPersonalizada() {
    this.setState({ cantidadPost: this.state.cantidadPersonalizada });
    this.setState({ mostrarEditarCantidad: false });
    setTimeout(() => {
      this.putProducto();
    }, 500);
  }
  putProducto() {
    return new Promise((resolve, reject) => {
      axios.put(
        "http://localhost:5000/api/carrito?id=" + this.props.idCarrito,
        {
          cantidad: this.state.cantidadPost,
        }
      );

      setTimeout(() => {
        resolve(
          this.props.getCarrito(this.props.id_usuario),
          alert("Cantidad Actualizada")
        );
      }, 300);
    });
  }
  deleteProducto() {
    return new Promise((resolve, reject) => {
      axios.delete(
        "http://localhost:5000/api/carrito?id=" + this.props.idCarrito,
        {}
      );
      setTimeout(() => {
        resolve(
          this.props.getCarrito(this.props.id_usuario),
          alert("producto Eliminado")
        );
      }, 100);
    });
  }
  render() {
    const editarCantidad = (
      <div style={{ display: "flex", flexDirection: "row", marginRight: 10 }}>
        <input
          type="number"
          className={styles.InputActualizarPrecio}
          onChange={(e) => this.cantidadPersonalizada(e.target.value)}
        />
        <Boton
          texto="actualizar"
          color="#FFD814"
          height="25px"
          funcion={() => this.getCantidadPersonalizada()}
        />
      </div>
    );

    const selectCantidad = (
      <select
        style={{
          marginRight: 10,
        }}
        onChange={(e) => this.getCantidadSelect(e.target.value)}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10+</option>
      </select>
    );

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    let { editar, productoInfo } = this.state;
    const { nombre, precio, imagen, cantidad, index, eliminarDelCarrito } =
      this.props;
    return (
      <div className={styles.ContenedorCard}>
        <div className={styles.ContenedorImagen}>
          <img
            src={imagen}
            alt={nombre}
            style={{
              margin: 5,
              maxWidth: "140px",
              maxHeight: "80%",
            }}
          />
        </div>
        <div className={styles.ContenedorInfo}>
          <div className={styles.Info}>
            <div style={{ flex: 4 }}>
              {" "}
              <span>{nombre}</span>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "column",
              }}
            >
              <span>
                <b>{formatter.format(precio)}</b>
              </span>
              <span>
                <b>({cantidad})</b>
              </span>
              <h6 style={{color: "lightslategrey"}}>
                <b>{formatter.format(cantidad * precio)}</b>
              </h6>
            </div>
          </div>

          <div className={styles.OpcionesCarrito}>
            {this.state.mostrarEditarCantidad === false
              ? selectCantidad
              : editarCantidad}
            <span
              onClick={() => this.deleteProducto()}
              style={{ fontSize: 20 }}
              className={styles.Eliminar}
            >
              Eliminar
            </span>
          </div>
        </div>
      </div>
    );
  }
}
