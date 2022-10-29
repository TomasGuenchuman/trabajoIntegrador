import React from "react";
import styles from "./Card.module.css";
import Boton from "../../../components/comun/Boton"
export default class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cantidad: 1
    };
  }
  alert(){
    alert("a")
  }
  render() {
    const {nombre,imagen,precio,categoria,añadirAlCarrito} = this.props;
    const {cantidad} = this.state;
    return (
      <div className={styles.Card}>
        <div style={{flex: 1,display: "flex",justifyContent: "center"}}>
          <img
            src={imagen}
            alt={nombre}
            width="150px"
            height="160px"
          />
        </div>   
        <div className={styles.InfoProducto}>
            <span><b>{nombre}</b></span>
            <span><b>$ {precio}</b></span>
            <Boton texto="sumar al carrito" color="#fd611a" funcion={() => añadirAlCarrito({nombre,precio,imagen,categoria,cantidad})}/>
        </div>
      </div>
    );
  }
}
