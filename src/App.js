import React from "react";
import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar"
import Contacto from "./pages/contacto/Contacto";
import Productos from "./pages/productos/Productos"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import Carrito from "./pages/carrito/Carrito";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Router>
        <div className={styles.App}>
          <LogIn />
          <Navbar />
          <Routes>
            <Route path="/" element={<Productos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="*" element={<span>Eror 404</span>} />
          </Routes>
        </div>
      </Router>
    );
  }
}
