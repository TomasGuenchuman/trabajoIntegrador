import React from "react";
import styles from "./CardCarrito.module.css";
import Boton from "../../../components/comun/Boton";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default class CardCarrito extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: "",
      cantidad: "",
      cantidadEditada: "",
    };
  }
  mostrarEdicion(seleccion) {
    if (seleccion !== "10+") {
      this.actualizarPrecio(this.props.index, seleccion);
      this.setState({ editar: seleccion });
    } else if (seleccion === "10+") {
      this.actualizarPrecio(this.props.index, seleccion);
      this.setState({ editar: seleccion });
    }
  }
  actualizarPrecio(index, cantidad) {
    let { editar } = this.state;
    editar = "";

    this.setState({ editar });
    if (cantidad !== "10+") {
      this.props.actualizarPrecio(index, Number(cantidad));
    }
  }
  cantidadPersonalizada(valor) {
    this.state.cantidadEditada = valor;
    this.setState(this.state.cantidadEditada);
  }

  render() {
    const editarPrecio = (
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
          funcion={() => this.mostrarEdicion(this.state.cantidadEditada)}
        />
      </div>
    );
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    let { editar } = this.state;
    const { nombre, precio, imagen, cantidad, index, eliminarDelCarrito } =
      this.props;
    return (
      <div className={styles.ContenedorCard}>
        <div className={styles.ContenedorImagen}>
          <img
            src={imagen}
            alt="imagen"
            width="240"
            height="80%"
            style={{
              margin: 5,
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
            </div>
          </div>

          <div className={styles.OpcionesCarrito}>
            <select
              style={{
                marginRight: 10,
                display: editar === "10+" ? "none" : "",
              }}
              onChange={(e) => this.mostrarEdicion(e.target.value)}
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
            {editar === "10+" ? editarPrecio : ""}
            <span
              onClick={() => eliminarDelCarrito(index)}
              style={{ fontSize: 20 }}
            >
              Eliminar
            </span>
          </div>
        </div>
      </div>
    );
  }
}
