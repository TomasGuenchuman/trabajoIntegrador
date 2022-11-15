import React from "react";
import styles from "./Carrito.module.css";
import carritovacio from "../../assets/emptyCart.png";
import Boton from "../../components/comun/boton/Boton";
import { Link } from "react-router-dom";

//carrito vacio
export default class CarritoVacio extends React.Component {
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
}
