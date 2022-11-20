import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Boton from "../../boton/Boton";
import styles from "./tablaUltimosIngresos.module.css";
import axios from "axios";
export default class AdminUltimosIngresos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarCard: false,
      infoProducto: {},
    };
  }
  createData(id, nombre, id_producto, imagen, cantidad) {
    return { id, nombre, id_producto, imagen, cantidad };
  }
  mostrarCard(id, nombre, id_producto, imagen, cantidad) {
    let productInfo = {
      id: id,
      nombre: nombre,
      id_producto: id_producto,
      imagen: imagen,
      cantidad: cantidad,
    };
    this.setState({ infoProducto: productInfo });
    this.setState({ mostrarCard: true });
  }
  esconderCard() {
    this.setState({ infoProducto: {} });
    this.setState({ mostrarCard: false });
    setTimeout(() => {
      this.props.getUltimosIngresos();
    }, 300);
  }
  deleteIngreso(id) {
    axios.delete("http://localhost:5000/api/ultimosIngresos?id=" + id);
    setTimeout(() => {
      this.props.getUltimosIngresos();
      alert("Producto Eliminado");
    }, 300);
  }
  render() {
    const { ultimosIngresos } = this.props;
    const { mostrarCard, infoProducto } = this.state;
    const rows = ultimosIngresos.map((ingreso) => {
      return this.createData(
        ingreso.id,
        ingreso.nombre,
        ingreso.id_producto,
        ingreso.imagen,
        ingreso.cantidad
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
            <TableCell align="center" style={{ fontWeight: "bolder" }}>
              {row.id_producto}
            </TableCell>
            <TableCell align="center">
              <img
                alt={row.nombre}
                src={row.imagen}
                style={{ maxHeight: "90px",maxWidth: "100px" }}
              />
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bolder" }}>
              {row.cantidad}
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
                      row.id_producto,
                      row.imagen,
                      row.cantidad
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
                  funcion={() => this.deleteIngreso(row.id)}
                />
              </div>
            </TableCell>
            {mostrarCard === true ? (
              <CardProducto
                infoProducto={infoProducto}
                esconderCard={() => this.esconderCard()}
                categorias={this.state.categorias}
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
      productos: [],
      id_producto: this.props.infoProducto.id_producto,
      cantidad: this.props.infoProducto.cantidad,
    };
  }
  componentDidMount() {
    this.getProductos();
  }
  getProductos() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:5000/api/productos").then((res) => {
        resolve(this.setState({ productos: res.data }));
      });
    });
  }
  putIngreso(id) {
    const { id_producto, cantidad } = this.state;
    axios.put("http://localhost:5000/api/ultimosIngresos", {
      id: id,
      id_producto: id_producto,
      cantidad: cantidad,
    });
    this.props.esconderCard();
  }
  getIdProducto(e) {
    this.setState({ id_producto: Number(e) });
  }
  getCantidad(e) {
    this.setState({ cantidad: Number(e) });
  }
  render() {
    const { infoProducto, esconderCard } = this.props;
    const { productos } = this.state;

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
          <label>Cantidad</label>
          <input
            type="number"
            value={this.state.cantidad}
            placeholder={infoProducto.cantidad}
            onChange={(e) => this.getCantidad(e.target.value)}
          />
          <input
            list="productos"
            placeholder="Cambiar producto"
            onChange={(e) => this.getIdProducto(e.target.value)}
          />
          <datalist id="productos" value="1">
            {productos.map((producto) => {
              return <option value={producto.id}> {producto.nombre}</option>;
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
            funcion={() => this.putIngreso(infoProducto.id)}
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
