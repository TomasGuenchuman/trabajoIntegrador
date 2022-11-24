import React from "react";
import styles from "./productos.module.css";
import BasicTable from "../../../components/comun/tabla/tabla";
import Boton from "../../../components/comun/boton/Boton";
import axios from "axios";
export default class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablaHead: [
        { head: "Nombre" },
        { head: "Imagen" },
        { head: "Precio" },
        { head: "Action" },
      ],
      productos: [],
      categorias: [],
      mostrarCard: false,
      mostrarCardCategorias: false,
      mostrarCardEliminarCategorias: false
    };
  }
  componentDidMount() {
    this.getProductos();
    this.getCategorias();
  }
  getProductos() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/productos").then((res) => {
        resolve(this.setState({ productos: res.data }));
      });
    });
  }
  mostrarCard() {
    this.setState({ mostrarCard: true });
  }
  mostrarCardCategorias() {
    this.setState({ mostrarCardCategorias: true });
  }
  esconderCard() {
    this.setState({ mostrarCard: false });
  }
  mostrarCardEliminarCategorias() {
    this.setState({ mostrarCardEliminarCategorias: true });
  }
  esconderCardEliminarCategorias() {
    this.setState({ mostrarCardEliminarCategorias: false });
  }
  esconderCardCategorias() {
    this.setState({ mostrarCardCategorias: false });
  }
  getCategorias() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/categorias").then((res) => {
        resolve(this.setState({ categorias: res.data }));
      });
    });
  }
  render() {
    return (
      <div
        style={{
          width: "95%",
          height: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {this.state.mostrarCard === true ? (
          <AñadirProducto
            categorias={this.state.categorias}
            esconderCard={() => this.esconderCard()}
            getProductos={() => this.getProductos()}
          />
        ) : this.state.mostrarCardCategorias === true ? (
          <AñadirCategoria
            mostrarCardCategorias={() => this.mostrarCardCategorias()}
            esconderCardCategorias={() => this.esconderCardCategorias()}
            getCategorias={() => this.getCategorias()}
          />
        ) : this.state.mostrarCardEliminarCategorias === true ? (
          <EliminarCategoria
            categorias={this.state.categorias}
            mostrarCardCategorias={() => this.mostrarCardEliminarCategorias()}
            esconderCardCategorias={() => this.esconderCardEliminarCategorias()}
            getCategorias={() => this.getCategorias()}
          />
        ) : (
          ""
        )}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <div>
            <h1>Productos</h1>
          </div>
          <div>
            <Boton
              texto="- eliminar categoria"
              color="red"
              funcion={() => this.mostrarCardEliminarCategorias()}
            />
          </div>
          <div>
            <Boton
              texto="+ añadir categoria"
              color="lightgreen"
              funcion={() => this.mostrarCardCategorias()}
            />
          </div>
          <div>
            <Boton
              texto="+ añadir producto"
              color="lightgreen"
              funcion={() => this.mostrarCard()}
            />
          </div>
        </div>
        <BasicTable
          tablaHead={this.state.tablaHead}
          productos={this.state.productos}
          tipo="productos"
          getProductos={() => this.getProductos()}
        />
      </div>
    );
  }
}
class EliminarCategoria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCategoria: 0,
    };
  }

  getCategoria(e) {
    this.setState({ idCategoria: e });
  }

  deleteCategoria() {
    if(this.state.idCategoria >= 1){
      return new Promise((resolve, reject) => {
        axios.delete("http://localhost:5000/api/categorias?id="+this.state.idCategoria, {});
        setTimeout(() => {
          this.props.esconderCardCategorias();
          alert("Categoria eliminada");
          this.props.getCategorias();
        }, 100);
      });
    }else {
      alert("No selecciono una categoria")
    }
    
  }
  render() {
    const { esconderCardCategorias, categorias } = this.props;
    return (
      <div className={styles.ContenedorAñadir}>
        <label>Categoria que desee eliminar:</label>
        <input
          list="categorias"
          placeholder="Seleccione categoria que desee eliminar"
          onChange={(e) => this.getCategoria(e.target.value)}
        />
        <datalist id="categorias" value="1">
          {categorias.map((categoria) => {
            return (
              <option value={categoria.id}>{categoria.descripcion}</option>
            );
          })}
        </datalist>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <Boton
            texto="Cancelar"
            color="red"
            width="100px"
            height="50px"
            funcion={() => esconderCardCategorias()}
          />
          <Boton
            texto="Eliminar"
            color="lightgreen"
            width="100px"
            height="50px"
            funcion={() => this.deleteCategoria()}
          />
        </div>
      </div>
    );
  }
}

class AñadirCategoria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descripcion: "",
    };
  }

  getDescripcion(e) {
    this.setState({ descripcion: e });
  }

  postCategoria() {
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:5000/api/categorias", {
        descripcion: this.state.descripcion,
      });
      setTimeout(() => {
        this.props.esconderCardCategorias();
        alert("Categoria añadida");
        this.props.getCategorias();
      }, 100);
    });
  }
  render() {
    const { esconderCardCategorias } = this.props;
    return (
      <div className={styles.ContenedorAñadir}>
        <label>descripcion categoria:</label>
        <input
          type="text"
          placeholder="Nombre de la categoria"
          onChange={(e) => this.getDescripcion(e.target.value)}
          maxLength="50"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <Boton
            texto="Cancelar"
            color="red"
            width="100px"
            height="50px"
            funcion={() => esconderCardCategorias()}
          />
          <Boton
            texto="Añadir"
            color="lightgreen"
            width="100px"
            height="50px"
            funcion={() => this.postCategoria()}
          />
        </div>
      </div>
    );
  }
}
class AñadirProducto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkImagen: "",
      nombre: "",
      precio: 0,
      categoria: "",
    };
  }
  getLinkImagen(e) {
    this.setState({ linkImagen: e });
  }
  getNombre(e) {
    this.setState({ nombre: e });
  }
  getPrecio(e) {
    this.setState({ precio: Number(e) });
  }
  getCategoria(e) {
    this.setState({ categoria: Number(e) });
  }
  postProducto() {
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:5000/api/productos", {
        nombre: this.state.nombre,
        precio: this.state.precio,
        imagen: this.state.linkImagen,
        categoria: this.state.categoria,
      });
      setTimeout(() => {
        this.props.esconderCard();
        alert("Producto añadido");
        this.props.getProductos();
      }, 100);
    });
  }
  render() {
    const { categorias, esconderCard } = this.props;
    return (
      <div className={styles.ContenedorAñadir}>
        <img
          alt="Foto de producto"
          src={this.state.linkImagen}
          width="200px"
          style={{ maxHeight: "200px" }}
        />
        <label>Imagen:</label>
        <input
          type="text"
          placeholder="Link foto del producto"
          onChange={(e) => this.getLinkImagen(e.target.value)}
        />
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Nombre del producto"
          onChange={(e) => this.getNombre(e.target.value)}
          maxLength="50"
        />
        <label>Precio:</label>
        <input
          type="number"
          placeholder="Precio del producto"
          onChange={(e) => this.getPrecio(e.target.value)}
        />
        <label>Categoria:</label>
        <input
          list="categorias"
          placeholder="Categoria del producto"
          onChange={(e) => this.getCategoria(e.target.value)}
        />
        <datalist id="categorias" value="1">
          {categorias.map((categoria) => {
            return (
              <option value={categoria.id}>{categoria.descripcion}</option>
            );
          })}
        </datalist>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <Boton
            texto="Cancelar"
            color="red"
            width="100px"
            height="50px"
            funcion={() => esconderCard()}
          />
          <Boton
            texto="Añadir"
            color="lightgreen"
            width="100px"
            height="50px"
            funcion={() => this.postProducto()}
          />
        </div>
      </div>
    );
  }
}
