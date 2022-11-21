import React from "react";
import Boton from "../../components/comun/boton/Boton";
import styles from "./Admin.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Productos from "./productos/productos";
import Usuarios from "./usuarios/usuarios";
import UltimosIngresos from "./ultimosIngresos/ultimosIngresos";
import Stock from "./stock/stock";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.ContenedorAdmin}>
        <div className={styles.Navbar}>
          <div className={styles.ContenedorInfoUser}>
            <div className={styles.NombreUsuario}>
              <h1>{this.props.logInNombre}</h1>
            </div>
            <div className={styles.FotoUsuario}>
              <img
                src={this.props.logInAvatar}
                alt={"foto usuario " + this.props.logInNombre}
              />
            </div>
          </div>
          <div className={styles.ContenedorOpciones}>
            <Link to="/admin/usuarios">
              <Boton
                texto="usuarios"
                height="15%"
                border="0"
                borde="0"
                color="lightblue"
              />
            </Link>
            <Link to="/admin/productos">
              <Boton
                texto="productos"
                height="15%"
                border="0"
                borde="0"
                color="lightblue"
              />
            </Link>
            <Link to="/admin/stock">
              <Boton
                texto="stock"
                border="0"
                height="15%"
                borde="0"
                color="lightblue"
              />
            </Link>
            <Link to="/admin/ultimosIngresos">
              <Boton
                texto="ultimos ingresos"
                height="15%"
                border="0"
                borde="0"
                color="lightblue"
              />
            </Link>
          </div>
          <Link
            to="/"
            className={styles.CerrarSesion}
            onClick={() => this.props.cerrarSesion()}
          >
            <Boton
              texto="cerrar sesion"
              height="15%"
              border="0"
              borde="0"
              color="#8cc6d9"
            />
          </Link>
        </div>
        <div className={styles.ContenedorRoutes}>
          <Routes>
            <Route path="/productos" element={<Productos />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/ultimosIngresos" element={<UltimosIngresos />} />
          </Routes>
        </div>
      </div>
    );
  }
}
