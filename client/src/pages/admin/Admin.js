import React from "react";
import Boton from "../../components/comun/Boton";
import styles from "./Admin.module.css";
import { BrowserRouter as Router, Routes, Route, Link,  } from "react-router-dom";
import Usuarios from "./usuarios/usuarios"
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
              <span>Nombre usuario</span>
            </div>
            <div className={styles.FotoUsuario}>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt="foto usuario"
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
            <Link to="/productos">
              <Boton
                texto="productos"
                height="15%"
                border="0"
                borde="0"
                color="lightblue"
              />
            </Link>
            <Link to="/stock">
              <Boton
                texto="stock"
                border="0"
                height="15%"
                borde="0"
                color="lightblue"
              />
            </Link>
            <Link to="/ultimosIngresos">
              <Boton
                texto="ultimos ingresos"
                height="15%"
                border="0"
                borde="0"
                color="lightblue"
              />
            </Link>
          </div>
          <Boton
            texto="cerrar sesion"
            height="15%"
            border="0"
            borde="0"
            color="#8cc6d9"
          />
        </div>
        <div className={styles.ContenedorRoutes}>
          <Routes>
            <Route path="/usuarios" element={<Usuarios />} />
          </Routes>
        </div>
      </div>
    );
  }
}
