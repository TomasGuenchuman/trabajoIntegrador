import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Boton from "../../boton/Boton";
import styles from "./tablaUsuarios.module.css";
import axios from "axios";
export default class AdminUsuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarCard: false,
      infoProducto: {},
    };
  }
  createData(id, avatar, nombre, email,permiso) {
    return { id, avatar, nombre, email,permiso};
  }
 
  mostrarCard(id, avatar, nombre, email,permiso) {
    let productInfo = {id, avatar, nombre, email,permiso}
    this.setState({infoProducto: productInfo})
    this.setState({ mostrarCard: true });
  }
  esconderCard() {
    this.setState({infoProducto: {}})
    this.setState({ mostrarCard: false });
  }
  render() {
    const { usuarios } = this.props;
    const { mostrarCard,infoProducto } = this.state;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const rows = usuarios.map((usuario) => {
      return this.createData(
        usuario.id,
        usuario.avatar,
        usuario.nombre,
        usuario.email,
        usuario.permiso
      );
    });
    return (
      <>
        
        {rows.map((row,index) => (
          
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            
            <TableCell component="th" scope="row" style={{ fontWeight: "bolder" }}>
              {row.id}
            </TableCell>
            <TableCell align="center" >
              <img alt={row.nombre} src={row.avatar} width="80px" style={{borderRadius: "50%"}}/>
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bolder" }}>{row.nombre}</TableCell>
            <TableCell align="center" style={{ fontWeight: "bolder" }}>{row.email}</TableCell>
            <TableCell align="center" style={{ fontWeight: "bolder" }}>{row.permiso}</TableCell>
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
                  funcion={() => this.mostrarCard(row.id,row.avatar,row.nombre,row.email,row.permiso)}
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
            {mostrarCard === true ? <CardProducto infoProducto={infoProducto}  esconderCard={() => this.esconderCard()} /> : ""}
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
    };
  }

  render() {
    const {infoProducto, esconderCard} = this.props;

    return (
      <div className={styles.ContenedorCard}>
        <div style={{width: "100%",height: "80%",display: "flex", flexDirection: "column", justifyContent: "center",alignItems: "center"}}>
            <img alt={infoProducto.nombre} src={infoProducto.avatar}/>
            <label>Nombre</label>
            <input type="text" value={infoProducto.nombre}/>
            <label>email</label>
            <input type="email" value={infoProducto.email}/>
            <label>Permiso: {infoProducto.permiso}</label>
            <input list="permisos" placeholder="Cambiar categoria"/>
            <datalist id="permisos" value="1">
                <option value="Admin" />
                <option value="User" />
            </datalist>
        </div>
        <div style={{height: "20%",width: "50%",display: "flex", flexDirection: "row",justifyContent: "space-evenly", alignItems: "center"}}>
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
                  funcion={() =>  esconderCard()}
                />
        </div>
      </div>
    );
  }
}
