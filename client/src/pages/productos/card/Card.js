import React from "react";
import styles from "./Card.module.css";
import Boton from "../../../components/comun/boton/Boton";
export default class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cantidad: 1,
    };
  }
  alert() {
    alert("a");
  }
  render() {
    const { nombre, imagen, precio, categoria,id, añadirAlCarrito } = this.props;
    const { cantidad } = this.state;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return (
      <div className={styles.Card}>
        <div style={{ flex: 1, display: "flex", justifyContent: "center",alignItems: "center" }}>
          <img src={imagen} alt={nombre} style={{width: this.props.categoria === "30"? "100px": "",maxWidth: "150px",maxHeight: "100%"}} />
        </div>
        <div className={styles.InfoProducto}>
          <span>
            <b>{nombre}</b>
          </span>
          <span>
            <b>{formatter.format(precio)}</b>
          </span>
          <Boton
            texto="sumar al carrito"
            color="#fd611a"
            funcion={() =>
              añadirAlCarrito(Number(this.props.id))
            }
          />
        </div>
      </div>
    );
  }
}
