import React from "react";
import styles from "./Card.module.css";
import Boton from "../../../components/comun/Boton"
export default class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.Card}>
        <div style={{flex: 1,display: "flex",justifyContent: "center"}}>
          <img
            src="https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_20551_Mother_ASUS_PRIME_A520M-K_AM4_f5d89e00-grn.jpg"
            alt="imagen"
            width="150px"
            height="160px"
          />
        </div>   
        <div className={styles.InfoProducto}>
            <span>Mother ASUS PRIME A520M-K AM4</span>
            <span>$ 17.350</span>
            <Boton texto="sumar al carrito" color="#fd611a"/>
        </div>
      </div>
    );
  }
}
