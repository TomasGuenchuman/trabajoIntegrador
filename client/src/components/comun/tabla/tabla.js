import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdminProductos from "./productos/tablaProductos";
import AdminUsuarios from "./usuarios/tablaUsuarios";
import AdminUltimosIngresos from "./ultimosIngresos/tablaUltimosIngresos";
import AdminStock from "./stock/tablaStock";

export default class BasicTable extends React.Component {
  //let tablaHead = this.props;
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      productos,
      tipo,
      usuarios,
      ultimosIngresos,
      stock,
      getProductos,
      getUltimosIngresos,
      getUsuarios,
    } = this.props;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return (
      <TableContainer component={Paper} tablaHead={this.props.tablaHead}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          tablaHead={this.props.tablaHead}
        >
          <TableHead tablaHead={this.props.tablaHead}>
            <TableRow tablaHead={this.props.tablaHead}>
              <TableCell style={{ fontWeight: "bolder" }}>#</TableCell>
              {this.props.tablaHead.map((head) => {
                return (
                  <TableCell align="center" style={{ fontWeight: "bolder" }}>
                    {head.head}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tipo === "productos" ? (
              <AdminProductos
                productos={productos}
                getProductos={() => getProductos()}
              />
            ) : tipo === "usuarios" ? (
              <AdminUsuarios
                usuarios={usuarios}
                getUsuarios={() => getUsuarios()}
              />
            ) : tipo === "ultimosIngresos" ? (
              <AdminUltimosIngresos
                ultimosIngresos={ultimosIngresos}
                getUltimosIngresos={() => getUltimosIngresos()}
              />
            ) : tipo === "stock" ? (
              <AdminStock stock={stock} />
            ) : (
              ""
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
