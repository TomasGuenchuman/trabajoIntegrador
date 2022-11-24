import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Boton from "../../boton/Boton";
import styles from "./tablaProductos.module.css";
import axios from "axios";
export default class AdminProductos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarCard: false,
      infoProducto: {},
      categorias: [],
    };
  }
  componentDidMount() {
    this.getCategorias();
    this.props.getProductos();
  }

  getCategorias() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/categorias").then((res) => {
        resolve(this.setState({ categorias: res.data }));
      });
    });
  }
  createData(id, nombre, imagen, precio, categoria) {
    return { id, nombre, imagen, precio, categoria };
  }
  categoriaElegida(categoriaId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "http://localhost:5000/api/categorias/categoriaElegida?id=" +
            categoriaId
        )
        .then((res) => {
          resolve(res.data[0].descripcion);
        });
    });
  }
  async mostrarCard(id, nombre, imagen, precio, categoria) {
    let categoriaDescripcion = await this.categoriaElegida(Number(categoria));
    let productInfo = {
      id: id,
      nombre: nombre,
      imagen: imagen,
      precio: precio,
      categoria: categoriaDescripcion,
      categoriaId: Number(categoria),
    };
    this.getCategorias()
    this.setState({ infoProducto: productInfo });
    this.setState({ mostrarCard: true });
  }
  esconderCard() {
    this.setState({ infoProducto: {} });
    this.setState({ mostrarCard: false });
    setTimeout(() => {
      this.props.getProductos();
    }, 100);
  }
  deleteProducto(id) {
    axios.delete("http://localhost:5000/api/productos?id=" + id);
    setTimeout(() => {
      this.props.getProductos();
      alert("Producto Eliminado");
    }, 100);
  }
  render() {
    const { productos, getProductos } = this.props;
    const { mostrarCard, infoProducto } = this.state;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const rows = productos.map((producto) => {
      return this.createData(
        producto.id,
        producto.nombre,
        producto.imagen,
        producto.precio,
        producto.categoria
      );
    });
    return (
      <>
        {rows.map((row, index) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell
              component="th"
              scope="row"
              style={{ fontWeight: "bolder" }}
            >
              {row.id}
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bolder" }}>
              {row.nombre}
            </TableCell>
            <TableCell align="center">
              <img
                alt={row.nombre}
                src={row.imagen}
                style={{width: this.props.categoria === "30"? "50px" : "100px"}}
                style={{maxHeight: "90px"}}
              />
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bolder" }}>
              {formatter.format(row.precio)}
            </TableCell>
            <TableCell align="center">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Boton
                  texto="edit"
                  color="orange"
                  borde="0"
                  padding="0"
                  width="50px"
                  height="35px"
                  funcion={() =>
                    this.mostrarCard(
                      row.id,
                      row.nombre,
                      row.imagen,
                      row.precio,
                      row.categoria
                    )
                  }
                />
                <Boton
                  texto="del"
                  color="red"
                  borde="0"
                  padding="0"
                  width="50px"
                  height="35px"
                  funcion={() => this.deleteProducto(row.id)}
                />
              </div>
            </TableCell>
            {mostrarCard === true ? (
              <CardProducto
                infoProducto={infoProducto}
                esconderCard={() => this.esconderCard()}
                categorias={this.state.categorias}
                getProductos={() => getProductos()}
              />
            ) : (
              ""
            )}
          </TableRow>
        ))}
      </>
    );
  }
}

class CardProducto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoria: this.props.infoProducto.categoriaId,
      nombre: this.props.infoProducto.nombre,
      precio: this.props.infoProducto.precio,
    };
  }
  putProducto(id) {
    const { nombre, precio, categoria } = this.state;
    axios.put("http://localhost:5000/api/productos", {
      id: id,
      nombre: nombre,
      precio: precio,
      imagen: this.props.infoProducto.imagen,
      categoria: categoria,
    });
    this.props.esconderCard();
    alert("Producto Actualizado")
  }

  getCategoria(categoriaElegida) {
    this.setState({ categoria: Number(categoriaElegida) });
  }
  getNombre(e) {
    this.setState({ nombre: e });
  }
  getPrecio(e) {
    this.setState({ precio: e });
  }
  render() {
    const { infoProducto, esconderCard, categorias } = this.props;

    return (
      <div className={styles.ContenedorCard}>
        <div
          style={{
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img alt={infoProducto.nombre} src={infoProducto.imagen} />
          <label>Nombre</label>
          <input
            type="text"
            placeholder={infoProducto.nombre}
            value={this.state.nombre}
            onChange={(e) => this.getNombre(e.target.value)}
          />
          <label>Precio</label>
          <input
            type="number"
            placeholder={infoProducto.precio}
            value={this.state.precio}
            onChange={(e) => this.getPrecio(e.target.value)}
          />
          <label>Categoria: {infoProducto.categoria}</label>
          <input
            list="categorias"
            placeholder="Cambiar categoria"
            onChange={(e) => this.getCategoria(e.target.value)}
          />
          <datalist id="categorias" value="1">
            {categorias.map((categoria) => {
              return (
                <option value={categoria.id}>{categoria.descripcion}</option>
              );
            })}
          </datalist>
        </div>
        <div
          style={{
            height: "20%",
            width: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Boton
            texto="Guardar"
            color="lightgreen"
            width="100px"
            height="50px"
            funcion={() => this.putProducto(infoProducto.id)}
          />
          <Boton
            texto="cancelar"
            color="red"
            borde="0"
            padding="0"
            width="100px"
            height="50px"
            funcion={() => esconderCard()}
          />
        </div>
      </div>
    );
  }
}
