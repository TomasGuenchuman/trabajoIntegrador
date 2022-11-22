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
  createData(id, avatar, nombre, email, permiso) {
    return { id, avatar, nombre, email, permiso };
  }

  mostrarCard(id, avatar, nombre, email, permiso) {
    let productInfo = { id, avatar, nombre, email, permiso };
    this.setState({ infoProducto: productInfo });
    this.setState({ mostrarCard: true });
  }
  esconderCard() {
    this.setState({ infoProducto: {} });
    this.setState({ mostrarCard: false });
    setTimeout(() => {
      this.props.getUsuarios();
    }, 100);
  }
  deleteIngreso(id) {
    axios.delete("http://localhost:5000/api/usuarios?id=" + id);
    setTimeout(() => {
      this.props.getUsuarios();
      alert("Usuario Eliminado");
    }, 100);
  }
  render() {
    const { usuarios } = this.props;
    const { mostrarCard, infoProducto } = this.state;
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
            <TableCell align="center">
              <img
                alt={row.nombre}
                src={row.avatar}
                width="80px"
                height="80px"
                style={{ borderRadius: "50%" }}
              />
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bolder" }}>
              {row.nombre}
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bolder" }}>
              {row.email}
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bolder" }}>
              {row.permiso}
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
                      row.avatar,
                      row.nombre,
                      row.email,
                      row.permiso
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
              <CardUsuario
                infoProducto={infoProducto}
                esconderCard={() => this.esconderCard()}
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

class CardUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: this.props.infoProducto.avatar,
      nombre: this.props.infoProducto.nombre,
      email: this.props.infoProducto.email,
      permiso: this.props.infoProducto.permiso,
    };
  }
  getAvatar(e) {
    this.setState({ avatar: e });
  }
  getNombre(e) {
    this.setState({ nombre: e });
  }
  getEmail(e) {
    this.setState({ email: e });
  }
  getPermiso(e) {
    this.setState({ permiso: e });
  }

  putUsuario(id) {
    const { avatar, nombre, email, permiso } = this.state;
    axios.put("http://localhost:5000/api/usuarios", {
      id: id,
      avatar: avatar === ""? this.props.infoProducto.avatar : this.state.avatar,
      nombre: nombre,
      email: email,
      permiso: permiso,
    });
    this.props.esconderCard();
  }
  render() {
    const { infoProducto, esconderCard } = this.props;

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
          <div style={{minHeight: "150px"}}>
            {this.state.avatar === "" || this.state.avatar.length <= 13?<img alt={infoProducto.nombre} src={infoProducto.avatar} style={{maxHeight: 150}}/> :  <img alt={infoProducto.nombre} src={this.state.avatar} style={{maxHeight: 150}}/>}
           
          </div>
          
          <label>Cabiar avatar del usuario:</label>
          <input
            type="text"
            placeholder="Link de nueva imagen para el avatar del usuario"
            onChange={(e) => this.getAvatar(e.target.value)}
          />
          <label>Nombre</label>
          <input
            type="text"
            value={this.state.nombre}
            placeholder={infoProducto.nombre}
            onChange={(e) => this.getNombre(e.target.value)}
          />
          <label>email</label>
          <input
            type="email"
            value={this.state.email}
            placeholder={infoProducto.email}
            onChange={(e) => this.getEmail(e.target.value)}
          />
          <label>Permiso: {infoProducto.permiso}</label>
          <input
            list="permisos"
            placeholder="Cambiar permiso"
            onChange={(e) => this.getPermiso(e.target.value)}
          />
          <datalist id="permisos" value="1">
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
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
            funcion={() => this.putUsuario(infoProducto.id)}
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
