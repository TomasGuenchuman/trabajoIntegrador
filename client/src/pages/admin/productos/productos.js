import React from "react";
import styles from "./productos.module.css"
import BasicTable from "../../../components/comun/tabla/tabla";
import Boton from "../../../components/comun/boton/Boton";
import axios from "axios";
import { Input } from "@mui/material";
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
    };
  }
  componentDidMount() {
    this.getProductos();
    this.getCategorias()
  }
  getProductos() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/productos").then((res) => {
        resolve(this.setState({ productos: res.data }));
      });
    });
  }
  mostrarCard() {
    this.setState({mostrarCard: true})
  }
  esconderCard() {
    this.setState({mostrarCard: false})
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
        {this.state.mostrarCard === true? <AñadirProducto categorias={this.state.categorias} esconderCard={() => this.esconderCard()} getProductos={() => this.getProductos()}/> : ""}
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
            <Boton texto="+ añadir producto" color="lightgreen" funcion={() => this.mostrarCard()}/>
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
    this.setState({linkImagen: e})
  }
  getNombre(e) {
    this.setState({nombre: e})
  }
  getPrecio(e) {
    this.setState({precio: Number(e)})
  }
  getCategoria(e) {
    this.setState({categoria: Number(e)})
  }
  postProducto(){
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:5000/api/productos", {
          nombre: this.state.nombre,
          precio: this.state.precio,
          imagen: this.state.linkImagen,
          categoria: this.state.categoria
        })
      setTimeout(() => {
        this.props.esconderCard();
        alert("Producto añadido");
        this.props.getProductos();
      }, 300);
    });
  }
  render() {
    const {categorias,esconderCard} = this.props;
    return (
      <div className={styles.ContenedorAñadir}>
        <img alt="Foto de producto" src={this.state.linkImagen} width="200px" style={{maxHeight: "200px"}}/>
        <label>Imagen:</label>
        <input type="text" placeholder="Link foto del producto" onChange={(e) => this.getLinkImagen(e.target.value)}/>
        <label>Nombre:</label>
        <input type="text" placeholder="Nombre del producto" onChange={(e) => this.getNombre(e.target.value)}/>
        <label>Precio:</label>
        <input type="number" placeholder="Precio del producto" onChange={(e) => this.getPrecio(e.target.value)}/>
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
        <div style={{display: "flex",flexDirection: "row",width: "50%",justifyContent: "space-between"}}>
          <Boton texto="Cancelar" color="red" width="100px" height="50px" funcion={() => esconderCard()}/>
          <Boton texto="Añadir" color="lightgreen" width="100px" height="50px" funcion={() => this.postProducto()}/>
        </div>
      </div>
    );
  }
}
