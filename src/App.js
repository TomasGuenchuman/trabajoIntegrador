import React from "react";
import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import Contacto from "./pages/contacto/Contacto";
import Productos from "./pages/productos/Productos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import Carrito from "./pages/carrito/Carrito";
import CarritoVacio from "./pages/carrito/CarritoVacio";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoria: [
        { categoria: "perifericos" },
        { categoria: "notebooks" },
        { categoria: "celulares" },
        { categoria: "monitores" },
        { categoria: "almacenamiento" },
        { categoria: "placas de video" },
      ],
      carrito: [],
      precioFinal: [],
      total: 0
    };
  }
  eliminarCategoria(index) {
    const { categoria } = this.state;
    categoria.splice(index, 1);
    this.setState({ categoria });
  }
  eliminarDelCarrito(index) {
    const { carrito, precioFinal } = this.state;
    precioFinal.splice(index,1)
    carrito.splice(index, 1);
    this.sumarPrecioFinal()
    this.setState({ carrito });
  }
  añadirAlCarrito(producto){
    const {carrito} = this.state;
    carrito.push(producto)
    this.precioTotal(producto.precio)
    this.sumarPrecioFinal()
    this.setState({ carrito });
  }
  precioTotal(precio){
    let {precioFinal} = this.state;
    let precioActualizado = precio
    precioFinal.push({precio,precioActualizado})
    this.setState({precioFinal})
  }
  actualizarPrecio(index,cantidad){
    let {precioFinal,carrito} = this.state;
    precioFinal[index].precioActualizado = precioFinal[index].precio * cantidad;
    carrito[index].cantidad = cantidad;
    this.sumarPrecioFinal()
    this.setState({precioFinal})
  }
  sumarPrecioFinal(){
    let {precioFinal,total} = this.state;
    total = precioFinal.reduce(function (acc, obj) { return Number(acc) + Number(obj.precioActualizado); }, 0);
    this.setState({total})
  }
  render() {
    const { categoria, carrito,precioFinal,total } = this.state;
    return (
      <Router>
        <div className={styles.App}>
          <LogIn />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <Productos
                  categoria={categoria}
                  eliminarCategoria={(index) => this.eliminarCategoria(index)}
                  añadirAlCarrito={({nombre,precio,imagen,categoria,cantidad}) => this.añadirAlCarrito({nombre,precio,imagen,categoria,cantidad})}
                />
              }
            />
            <Route path="/contacto" element={<Contacto />} />
            <Route
              path="/carrito"
              element={
                carrito.length >= 1 ? (
                  <Carrito
                    eliminarDelCarrito={(index) =>
                      this.eliminarDelCarrito(index)
                    }
                    carrito={carrito}
                    total={total}
                    precioFinal={precioFinal}
                    actualizarPrecio={(index,cantidad) => this.actualizarPrecio(index,cantidad)}
                  />
                ) : (
                  <CarritoVacio />
                )
              }
            />
            <Route path="*" element={<span>Eror 404</span>} />
          </Routes>
        </div>
      </Router>
    );
  }
}
