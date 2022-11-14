import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(id, avatar, nombre, email, permisos) {
  return { id, avatar, nombre, email, permisos };
}

const rows = [
  createData(1, "img", "tomas", "tomasschool391@gmail.com", "admin"),
  createData(2, "img", "a", "ejemplo1@gmail.com", "admin"),
  createData(3, "img", "b", "ejemplo2@gmail.com", "admin"),
  
];


export default function BasicTable() {
  //let tablaHead = this.props;
  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Avatar</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Permiso</TableCell>
            <TableCell align="center">action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.avatar}</TableCell>
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.permisos}</TableCell>
              <TableCell align="center">botones</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
