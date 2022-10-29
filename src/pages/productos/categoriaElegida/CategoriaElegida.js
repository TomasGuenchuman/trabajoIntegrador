import React from "react";
import styles from "./CategoriaElegida.module.css";

export default class CategoriasElegidas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {categoria,index,eliminarCategoria} = this.props;
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
        <div className={styles.Eliminar} onClick={() => eliminarCategoria(index)}>
          <span>x</span>
        </div>
        <span>{categoria}</span>
      </div>
    );
  }
}
