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
      categoriaId: 0,
    };
  }
  componentDidMount() {
    this.getCategorias();
    this.getProductos();
    this.eliminarCategoria(0);
  }

  getCategorias() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/categorias").then((res) => {
        resolve(this.setState({ categorias: res.data }));
      });
    });
  }
  getProductos() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/productos").then((res) => {
        resolve(this.setState({ productos: res.data }));
      });
    });
  }
  getcategoriaElegida(categoriaId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "http://localhost:5000/api/productos/categoriaElegida?categoriaId=" +
            categoriaId
        )
        .then((res) => {
          resolve(res.data);
        });
    });
  }
  async agregarCategoria(categoriaObjeto) {
    let { ocultarCategoria } = this.state;
    this.props.agregarCategoria(categoriaObjeto);
    let dataCategoria = await this.getcategoriaElegida(categoriaObjeto.id);
    this.setState({ productos: dataCategoria });
    ocultarCategoria = true;
    this.setState({ ocultarCategoria });
    this.setState({ categoriaId: categoriaObjeto.id });
  }
  eliminarCategoria(index) {
    this.props.eliminarCategoria(index);
    this.getProductos();
  }
  async filtro(orden, categoriaId) {
    let ordenProductos = "";
    ordenProductos = orden;
    if (categoriaId >= 1) {
      await this.getOrdenConCategorias(categoriaId, ordenProductos);
    } else {
      await this.getOrdenSinCategoria(ordenProductos);
    }
  }
  getOrdenConCategorias(categoriaId, ordenProductos) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "http://localhost:5000/api/productos/filtro?categoriaId=" +
            categoriaId +
            "&orden=" +
            ordenProductos
        )
        .then((res) => {
          resolve(this.setState({ productos: res.data }));
        });
    });
  }

  getOrdenSinCategoria(ordenProductos) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "http://localhost:5000/api/productos/filtro?categoriaId=&orden=" +
            ordenProductos
        )
        .then((res) => {
          resolve(this.setState({ productos: res.data }));
        });
    });
  }
  resetCategoriaId() {
    this.setState({ categoriaId: 0 });
  }
  render() {
    const { categoria, eliminarCategoria, añadirAlCarrito } = this.props;
    const { categorias, productos, categoriaId } = this.state;

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
                {categorias.map((categoriaElegida, index) => {
                  return (
                    <span
                      onClick={() => this.agregarCategoria(categorias[index])}
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
                <select
                  onChange={(e) => this.filtro(e.target.value, categoriaId)}
                >
                  <option value=" " selected>
                    Ordenar por
                  </option>
                  <option value="mayor">Mayor precio</option>
                  <option value="menor">Menor precio</option>
                </select>
              </div>

              <div className={styles.ContenedorCards}>
                <div className={styles.CategoriasElegidas}>
                  {categoria.map((element, index) => {
                    return (
                      <CategoriasElegidas
                        index={index}
                        categoria={element.descripcion}
                        eliminarCategoria={(index) =>
                          this.eliminarCategoria(index)
                        }
                        id={element.id}
                        resetCategoriaId={() => this.resetCategoriaId()}
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
