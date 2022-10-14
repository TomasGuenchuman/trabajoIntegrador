import React from "react";
import styles from "./Carrito.module.css";
import carritovacio from "../../assets/emptyCart.png";
import Boton from "../../components/comun/Boton";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
export default  class Carrito extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <div className={styles.Carrito} style={{height: "50%"}}>
            <div className={styles.Imagen}>
              <img src={carritovacio} alt="Carrito Vacio" width="50%"/>
            </div>
            <div className={styles.Texto}>
              <span style={{fontSize: "1.25rem"}}><b>Actualmente no tenes productos en tu carrito.</b></span>
              <Boton texto="Empezar a comprar" color="lightgray" width="200px" height="50px"/>
            </div>
        </div>
    );
  }
}