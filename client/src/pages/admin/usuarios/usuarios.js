import React from "react";
import styles from "./usuarios.module.css";
import BasicTable from "./tabla";
import Boton from "../../../components/comun/Boton";
export default class Usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablaHead: [
        { head: "Avatar" },
        { head: "Nombre" },
        { head: "Email" },
        { head: "Permiso" },
        { head: "Action" },
      ],
    };
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
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <div>
            <h1>USUAIOS</h1>
          </div>
          <div>
            <Boton texto="+ añadir usuario" color="lightgreen" />
          </div>
        </div>
        <BasicTable tablaHead={this.state.tablaHead}/>
        {/*<table className={styles.Tabla}>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
      </table>*/}
      </div>
    );
  }
}
