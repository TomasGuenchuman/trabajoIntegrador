import React from "react";
import styles from "./Carrito.module.css";
import carritovacio from "../../assets/emptyCart.png";
import Boton from "../../components/comun/Boton";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CardCarrito from "./cardCarrito/CardCarrito";

// routes del carrito
/*export default  class Carrito extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <Routes>
          <Route path="/logIn" element={<IniciarSesion />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    );
  }
}*/

//carrito vacio
/*export default class CarritoVacio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.Carrito} style={{ height: "80%" }}>
        <div className={styles.Imagen}>
          <img src={carritovacio} alt="Carrito Vacio" width="50%" />
        </div>
        <div className={styles.Texto}>
          <span style={{ fontSize: "1.25rem" }}>
            <b>Actualmente no tenes productos en tu carrito.</b>
          </span>
          <Link to="/">
            <Boton
              texto="Empezar a comprar"
              color="lightgray"
              width="200px"
              height="50px"
            />
          </Link>
        </div>
      </div>
    );
  }
}*/

// CARRITO CON PRODUCTO
export default class Carrito extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          height: "calc(100% - 10vh)",
          display: "flex",
          flexDirection: "row",
          borderRadius: 10,
        }}
      >
        <div className={styles.ContenedorCarrito}>
          <div className={styles.ContenedorProductos}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: 15,
                height: 40
              }}
            >
              <h1>carrito</h1>
              <h2>precio</h2>
            </div>
            <div style={{height: 600,backgroundColor: "lightgray",overflow: "scroll",overflowX: "hidden"}}>
              <CardCarrito />
              <CardCarrito />
              <CardCarrito />
              <CardCarrito />
            </div>
            <div style={{width: "100%",height: 40,display:"flex",justifyContent:"flex-end"}}>
              <span style={{fontSize: "1.8rem",marginTop: 10}}>Subtotal (* productos): <b>$100</b></span>
            </div>
          </div>
        </div>

        <div className={styles.Pago}>
          <div className={styles.ContenedorPago}>
            <div
              style={{
                display: "flex",
                flex: 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "3rem", textAlign: "center" }}>
                subtotal (* productos): <b>$100</b>
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
