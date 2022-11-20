import React from "react";
import styles from "./Carrito.module.css";
import carritovacio from "../../assets/emptyCart.png";
import Boton from "../../components/comun/boton/Boton";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CardCarrito from "./cardCarrito/CardCarrito";
// CARRITO CON PRODUCTO
export default class Carrito extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    this.props.getCarrito(this.props.logInId)
  }
  cantidadDeProductos() {
    let { carrito } = this.props;
    let cantidadToTal = 0;
    carrito.map((producto) => {
      cantidadToTal += producto.cantidad;
      return cantidadToTal;
    });
    return cantidadToTal;
  }
  precioCarrito(){
    let {carrito} = this.props;
    let arrayPrecioFinal = [];
    carrito.map((producto,index) => {
      arrayPrecioFinal.push(producto.cantidad * producto.precio)
    });
    console.log(arrayPrecioFinal)
    let total = arrayPrecioFinal.reduce(function (acc, obj) {
      return Number(acc) + Number(obj);
    }, 0);
    return total
  }
  render() {
    const {
      carrito,
      eliminarDelCarrito,
      precioFinal,
      borrar,
      actualizarPrecio,
      total,
    } = this.props;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return (
      <div className={styles.Contenedor}>
        <div className={styles.ContenedorCarrito}>
          <div className={styles.ContenedorProductos}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                margin: "5px 15px",
                height: 40,
              }}
            >
              <h2 onClick={() => this.precioCarrito()}>carrito</h2>
              <h2>precio</h2>
            </div>
            <div className={styles.ContenedorCard}>
              {carrito.map((producto, index) => {
                return (
                  <CardCarrito
                    cantidad={producto.cantidad}
                    imagen={producto.imagen}
                    precio={producto.precio}
                    nombre={producto.nombre}
                    id={producto.id}
                    id_usuario={producto.id_usuario}
                    index={index}
                    idCarrito={producto.idCarrito}
                    getCarrito={(id) => this.props.getCarrito(id)}
                  />
                );
              })}
            </div>
            <div className={styles.ContenedorSubtotal}>
              <span style={{ fontSize: "1.8rem", marginTop: 10 }}>
                Subtotal ({this.cantidadDeProductos()} productos):{" "}
                <b>{formatter.format(this.precioCarrito())}</b>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.Pago}>
          <div className={styles.ContenedorPago}>
            <div className={styles.ContenedorSubtotalPago}>
              <span style={{ fontSize: "3rem", textAlign: "center" }}>
                subtotal ({this.cantidadDeProductos()} productos):{" "}
                <b>{formatter.format(this.precioCarrito())}</b>
              </span>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Link
                to="/pagos"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Boton texto="Proceder al pago" color="#FFD814" width="80%" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
