import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdminProductos from "./productos/tablaProductos";
/*function createData(id, avatar, nombre, email, permisos) {
  return { id, avatar, nombre, email, permisos };
}

const rows = [
  createData(1, "img", "tomas", "tomasschool391@gmail.com", "admin"),
  createData(2, "img", "a", "ejemplo1@gmail.com", "admin"),
  createData(3, "img", "b", "ejemplo2@gmail.com", "admin"),
  
];*/


export default class BasicTable extends React.Component{
  //let tablaHead = this.props;
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render(){
    const {productos,tipo} = this.props;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return (
      <TableContainer component={Paper} tablaHead={this.props.tablaHead}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" tablaHead={this.props.tablaHead}>
          <TableHead tablaHead={this.props.tablaHead}>
            <TableRow tablaHead={this.props.tablaHead}>
              <TableCell>#</TableCell>
              {this.props.tablaHead.map((head) => {
                return(
                <TableCell align="center">{head.head}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tipo === "productos"? <AdminProductos productos={productos}/> : ""}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
 
}



