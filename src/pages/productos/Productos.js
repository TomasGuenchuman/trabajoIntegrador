import React from "react";
import styles from "./Productos.module.css";
import Card from "./card/Card";
import CategoriasElegidas from "./categoriaElegida/CategoriaElegida";

export default class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {categoria,eliminarCategoria} = this.props;
    return (
      <div
        style={{
          height: "calc(100% - 10vh)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#EAEDED",
          userSelect: "none",
        }}
      >
        <div className={styles.ContenedorProductos}>
          <div className={styles.Titulo}>
            <h1>Productos</h1>
          </div>
          <div
            style={{ height: "100%", display: "flex", flexDirection: "row" }}
          >
            <div className={styles.Categorias}>
              <h2
                style={{
                  borderBottom: "1px solid",
                  width: "100%",
                  textAlign: "center",
                  padding: 20,
                }}
              >
                categorias
              </h2>
              <span>Componentes</span>
              <span>Perifericos</span>
              <span>Monitores</span>
              <span>Celulares</span>
            </div>
            <div
              style={{
                flex: 2,
                backgroundColor: "lightblue",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className={styles.Filtros}>
                <select>
                  <option>Ordenar por</option>
                  <option>Mayor precio</option>
                  <option>Menor precio</option>
                </select>
              </div>

              <div className={styles.ContenedorCards}>
                <div className={styles.CategoriasElegidas}>
                  {categoria.map((element,index) => {
                    return(
                      <CategoriasElegidas index={index} categoria={element.categoria} eliminarCategoria={(index) => eliminarCategoria(index)}/>
                    );
                  })}
                </div>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
