import React from "react";
import styles from "./Productos.module.css";
import Card from "./card/Card";
import CategoriasElegidas from "./categoriaElegida/CategoriaElegida";
import productos from "./productos.json";

export default class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  agregarCategoria(nombreCategoria){
    let {ocultarCategoria} = this.state
    this.props.agregarCategoria(nombreCategoria)
    ocultarCategoria = true
    this.setState(ocultarCategoria)
  }
  render() {
    const { categoria, eliminarCategoria, añadirAlCarrito } = this.props;
    let {agregarCategoria} = this.state;
    //categorias en un array distinto cuando alla DB solo se necesita el MAP
    let arrayCategorias = productos.map((categoriaElegida) => {
      return(categoriaElegida.categoria);
    })
    // filtrando categorias repetidas (ya que no hay db)
    let categorias = arrayCategorias.filter((item,index)=>{
      return arrayCategorias.indexOf(item) === index;
    })
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
          <div
            style={{ height: "100%", display: "flex", flexDirection: "row",boxShadow: "10px 9px 18px -8px rgb(0 0 0 / 28%)" }}
          >
            <div className={styles.Categorias}>
              <h2
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: 20,
                }}
              >
                CATEGORIAS
              </h2>
              <div style={{overflowY: "scroll"}}>
                {categorias.map((categoriaElegida) => {
                  return(
                    <span onClick={()=> this.agregarCategoria(categoriaElegida)} style={{display: categoria.some((element) => element.categoria === categoriaElegida)? "none" : "flex"}}>{categoriaElegida}</span>
                  );
                  
                })}
              </div>
              </div>
            <div
              style={{
                flex: 2,
                backgroundColor: "whitesmoke",
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
                  {categoria.map((element, index) => {
                    return (
                      <CategoriasElegidas
                        index={index}
                        categoria={element.categoria}
                        eliminarCategoria={(index) => eliminarCategoria(index)}
                      />
                    );
                  })}
                </div>
                {productos.map((producto, index) => {
                  return (
                    <Card
                      index={index}
                      nombre={producto.nombre}
                      imagen={producto.imagen}
                      precio={producto.precio}
                      categoria={producto.categoria}
                      añadirAlCarrito={({nombre, precio, imagen, categoria,cantidad}) =>
                        añadirAlCarrito({nombre, precio, imagen, categoria,cantidad})
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
