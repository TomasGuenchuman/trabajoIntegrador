import React from "react";
import styles from "./Productos.module.css";

export default class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
        <div style={{height: "calc(100% - 10vh)",display: "flex",justifyContent: "center"}}>
            <div className={styles.ContenedorProductos}>
                <div className={styles.Titulo}>
                    <h1>Productos</h1>
                </div>
            </div>
        </div>
    );
  }
}
