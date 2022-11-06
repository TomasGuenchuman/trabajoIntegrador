import React from "react";
import styles from "./Productos.module.css";
import Card from "./card/Card";
import CategoriasElegidas from "./categoriaElegida/CategoriaElegida";
//import productos from "./productos.json"; JSON
import axios from "axios";
export default class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      productos: [],
    };
  }
  componentDidMount() {
    this.getCategorias();
    this.getProductos();
  }
  getCategorias() {
    axios.get("http://localhost:5000/api/categorias").then((res) => {
      this.setState({ categorias: res.data });
    });
  }
  getProductos() {
    axios.get("http://localhost:5000/api/productos").then((res) => {
      this.setState({ productos: res.data });
    });
  }
  agregarCategoria(nombreCategoria) {
    let { ocultarCategoria } = this.state;
    this.props.agregarCategoria(nombreCategoria);
    ocultarCategoria = true;
    this.setState(ocultarCategoria);
  }
  render() {
    const { categoria, eliminarCategoria, añadirAlCarrito } = this.props;
    const { categorias,productos } = this.state;
    return (
      <div className={styles.Contenedor}>
        <div className={styles.ContenedorProductos}>
          <div className={styles.ProductosContenedor}>
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
              <div style={{ overflowY: "scroll" }}>
                {categorias.map((categoriaElegida) => {
                  return (
                    <span
                      onClick={() => this.agregarCategoria(categoriaElegida)}
                      style={{
                        display: categoria.some(
                          (element) => element.categoria === categoriaElegida
                        )
                          ? "none"
                          : "flex",
                      }}
                    >
                      {categoriaElegida.descripcion}
                    </span>
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
                      id={producto.id}
                      nombre={producto.nombre}
                      imagen={producto.imagen}
                      precio={producto.precio}
                      categoria={producto.categoria}
                      añadirAlCarrito={(productoId) =>
                        añadirAlCarrito(productoId)
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
