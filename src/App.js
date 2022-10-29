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
import LogIn from "./pages/LogIn/LogIn";
import Carrito from "./pages/carrito/Carrito";
import CarritoVacio from "./pages/carrito/CarritoVacio";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoria: [{categoria: "perifericos"},{categoria: "notebooks"},{categoria: "celulares"}]
    };
  }
  eliminarCategoria(index){
    const {categoria} = this.state;
    categoria.splice(index,1)
    this.setState({categoria})
  }
  render() {
    const {categoria} = this.state;
    return (
      <Router>
        <div className={styles.App}>
          <LogIn />
          <Navbar />
          <Routes>
            <Route path="/" element={<Productos categoria={categoria} eliminarCategoria={(index) => this.eliminarCategoria(index)}/>} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={categoria.length >= 1? <Carrito /> : <CarritoVacio />} />
            <Route path="*" element={<span>Eror 404</span>} />
          </Routes>
        </div>
      </Router>
    );
  }
}
