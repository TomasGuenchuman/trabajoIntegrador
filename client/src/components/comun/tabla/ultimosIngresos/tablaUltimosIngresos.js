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
  createData(id, cantidad,id_producto) {
    return { id, cantidad,id_producto};
  }
  /*async mostrarCard(id,nombre,imagen,precio,categoria) {
    let categoriaDescripcion = await this.categoriaElegida(Number(categoria))
    let productInfo = {id:id,nombre:nombre,imagen:imagen,precio: precio,categoria: categoriaDescripcion}
    this.setState({infoProducto: productInfo})
    this.setState({ mostrarCard: true });
  }
  esconderCard() {
    this.setState({infoProducto: {}})
    this.setState({ mostrarCard: false });
  }*/
  a(a) {
    console.log(a)
  }
  render() {
    const { ultimosIngresos } = this.props;
    const { mostrarCard, infoProducto } = this.state;
    const rows = ultimosIngresos.map((ingreso) => {
      return  this.createData(ingreso.id, ingreso.cantidad, ingreso.id_producto);
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
                width="80px"
                
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
                />
                <Boton
                  texto="del"
                  color="red"
                  borde="0"
                  padding="0"
                  width="50px"
                  height="35px"
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
    this.state = {};
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
          <input type="text" value={infoProducto.nombre} />
          <label>Precio</label>
          <input type="number" value={infoProducto.precio} />
          <label>Categoria: {infoProducto.categoria}</label>
          <input list="categorias" placeholder="Cambiar categoria" />
          <datalist id="categorias" value="1">
            {categorias.map((categoria) => {
              return (
                <option value={categoria.descripcion}> {categoria.id}</option>
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
