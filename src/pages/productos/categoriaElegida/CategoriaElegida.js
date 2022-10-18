import React from "react";
import styles from "./CategoriaElegida.module.css";

export default class CategoriasElegidas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "orange",
          padding: "15px 30px",
          position: "relative",
          margin: 5,
          borderRadius: 5,
        }}
      >
        <div className={styles.Eliminar}>
          <span>x</span>
        </div>
        <span>componentes</span>
      </div>
    );
  }
}
