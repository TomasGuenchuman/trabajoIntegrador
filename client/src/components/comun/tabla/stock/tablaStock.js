import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export default class AdminStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarCard: false,
      infoProducto: {},
    };
  }
  createData(id, nombre, imagen, cantidad) {
    return { id, nombre, imagen, cantidad };
  }

  render() {
    const { stock } = this.props;
    const rows = stock.map((stock) => {
      return this.createData(
        stock.id,
        stock.nombre,
        stock.imagen,
        stock.cantidad
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
                style={{ maxHeight: "90px",maxWidth: "100px" }}
              />
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bolder" }}>
              {row.cantidad}
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }
}
